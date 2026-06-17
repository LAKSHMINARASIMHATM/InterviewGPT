export async function getEmbedding(text: string): Promise<number[]> {
  const modelId = "BAAI/bge-large-en-v1.5";
  const url = `https://router.huggingface.co/hf-inference/models/${modelId}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (process.env.HF_TOKEN) {
    headers["Authorization"] = `Bearer ${process.env.HF_TOKEN}`;
  }

  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      inputs: text,
      options: { wait_for_model: true }
    })
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Hugging Face API returned status ${res.status}: ${errText}`);
  }

  const data = await res.json();
  return poolEmbeddings(data);
}

export async function getEmbeddingsBatch(texts: string[]): Promise<number[][]> {
  const modelId = "BAAI/bge-large-en-v1.5";
  const url = `https://router.huggingface.co/hf-inference/models/${modelId}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (process.env.HF_TOKEN) {
    headers["Authorization"] = `Bearer ${process.env.HF_TOKEN}`;
  }

  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      inputs: texts,
      options: { wait_for_model: true }
    })
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Hugging Face API returned status ${res.status}: ${errText}`);
  }

  const data = await res.json();
  if (!Array.isArray(data)) {
    throw new Error("Invalid batch embedding response format");
  }

  return data.map(item => poolEmbeddings(item));
}

function poolEmbeddings(data: any): number[] {
  if (!Array.isArray(data)) {
    throw new Error("Invalid embedding response format");
  }

  // Case 1: Already 1D array of floats
  if (typeof data[0] === "number") {
    return data as number[];
  }

  // Case 2: 2D array [seq_len, 1024]
  if (Array.isArray(data[0]) && typeof data[0][0] === "number") {
    if (data.length === 1) {
      return data[0] as number[];
    }
    // Perform mean pooling along the sequence length
    const seqLen = data.length;
    const dims = data[0].length;
    const mean = new Array(dims).fill(0);
    for (let i = 0; i < seqLen; i++) {
      for (let j = 0; j < dims; j++) {
        mean[j] += data[i][j];
      }
    }
    return mean.map(v => v / seqLen);
  }

  // Case 3: 3D array [1, seq_len, 1024]
  if (Array.isArray(data[0]) && Array.isArray(data[0][0])) {
    const seqData = data[0]; 
    const seqLen = seqData.length;
    const dims = seqData[0].length;
    const mean = new Array(dims).fill(0);
    for (let i = 0; i < seqLen; i++) {
      for (let j = 0; j < dims; j++) {
        mean[j] += seqData[i][j];
      }
    }
    return mean.map(v => v / seqLen);
  }

  throw new Error("Unsupported embedding shape from Hugging Face");
}
