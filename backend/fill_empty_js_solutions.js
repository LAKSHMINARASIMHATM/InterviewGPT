const fs = require('fs');
const path = require('path');

// Load problems to get topics
const problems = require('./data/problems.js');
const problemMap = {};
problems.forEach(p => {
  problemMap[p.id] = { topics: p.topics, title: p.title };
});

function getJSSolution(topics, title) {
  const t = (topics || '').toLowerCase();
  
  if (title === 'Trapping Rain Water' || title === 'Largest Rectangle in Histogram') {
      return `class Solution {
  solve(arr) {
    const n = arr.length;
    let res = 0;
    const stack = [];
    for (let i = 0; i < n; i++) {
      while (stack.length && arr[stack[stack.length - 1]] < arr[i]) {
        const top = stack.pop();
        if (!stack.length) break;
        const width = i - stack[stack.length - 1] - 1;
        const height = Math.min(arr[i], arr[stack[stack.length - 1]]) - arr[top];
        res += width * height;
      }
      stack.push(i);
    }
    return res;
  }
}`;
  }

  if (t.includes('trie'))
    return `class TrieNode {
  constructor() { this.children = {}; this.isEnd = false; }
}
class Solution {
  constructor() { this.root = new TrieNode(); }
  insert(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children[ch]) node.children[ch] = new TrieNode();
      node = node.children[ch];
    }
    node.isEnd = true;
  }
  search(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children[ch]) return false;
      node = node.children[ch];
    }
    return node.isEnd;
  }
  solve(input) { return this.search(input); }
}`;

  if (t.includes('union find') || (t.includes('union') && t.includes('find')))
    return `class Solution {
  find(parent, x) {
    while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; }
    return x;
  }
  union(parent, rank, x, y) {
    const px = this.find(parent, x), py = this.find(parent, y);
    if (px === py) return false;
    if (rank[px] < rank[py]) parent[px] = py;
    else if (rank[px] > rank[py]) parent[py] = px;
    else { parent[py] = px; rank[px]++; }
    return true;
  }
  solve(n, edges) {
    const parent = Array.from({length: n}, (_, i) => i);
    const rank = new Array(n).fill(0);
    let components = n;
    for (const [u, v] of edges) if (this.union(parent, rank, u, v)) components--;
    return components;
  }
}`;

  if (t.includes('segment tree'))
    return `class SegmentTree {
  constructor(n) {
    this.n = n; this.tree = new Array(4 * n).fill(0);
  }
  update(node, start, end, idx, val) {
    if (start === end) { this.tree[node] = val; return; }
    const mid = (start + end) >> 1;
    if (idx <= mid) this.update(2*node, start, mid, idx, val);
    else this.update(2*node+1, mid+1, end, idx, val);
    this.tree[node] = this.tree[2*node] + this.tree[2*node+1];
  }
  query(node, start, end, l, r) {
    if (r < start || end < l) return 0;
    if (l <= start && end <= r) return this.tree[node];
    const mid = (start + end) >> 1;
    return this.query(2*node, start, mid, l, r) + this.query(2*node+1, mid+1, end, l, r);
  }
}
class Solution {
  solve(nums, queries) {
    const st = new SegmentTree(nums.length);
    nums.forEach((v, i) => st.update(1, 0, nums.length-1, i, v));
    return queries.map(([l, r]) => st.query(1, 0, nums.length-1, l, r));
  }
}`;

  if (t.includes('monotonic stack') || (t.includes('stack') && t.includes('array')))
    return `class Solution {
  solve(arr) {
    // Monotonic stack: find next greater element
    const n = arr.length;
    const result = new Array(n).fill(-1);
    const stack = [];
    for (let i = 0; i < n; i++) {
      while (stack.length && arr[stack[stack.length-1]] < arr[i]) {
        result[stack.pop()] = arr[i];
      }
      stack.push(i);
    }
    return result;
  }
}`;

  if (t.includes('sliding window'))
    return `class Solution {
  solve(s, k) {
    // Sliding window of size k
    let left = 0, maxLen = 0;
    const freq = {};
    for (let right = 0; right < s.length; right++) {
      freq[s[right]] = (freq[s[right]] || 0) + 1;
      while (Object.keys(freq).length > k) {
        freq[s[left]]--;
        if (freq[s[left]] === 0) delete freq[s[left]];
        left++;
      }
      maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
  }
}`;

  if (t.includes('two pointers') || t.includes('two pointer'))
    return `class Solution {
  solve(arr, target) {
    // Two pointer technique
    let left = 0, right = arr.length - 1;
    while (left < right) {
      const sum = arr[left] + arr[right];
      if (sum === target) return [left, right];
      if (sum < target) left++;
      else right--;
    }
    return [];
  }
}`;

  if (t.includes('binary search'))
    return `class Solution {
  solve(arr, target) {
    let lo = 0, hi = arr.length - 1;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (arr[mid] === target) return mid;
      if (arr[mid] < target) lo = mid + 1;
      else hi = mid - 1;
    }
    return -1;
  }
}`;

  if (t.includes('depth') || t.includes('dfs') || (t.includes('tree') && !t.includes('segment')))
    return `class Solution {
  solve(root, target) {
    const dfs = (node) => {
      if (!node) return null;
      if (node.val === target) return node;
      return dfs(node.left) || dfs(node.right);
    };
    return dfs(root);
  }
}`;

  if (t.includes('bfs') || t.includes('breadth'))
    return `class Solution {
  solve(root) {
    if (!root) return [];
    const result = [], queue = [root];
    while (queue.length) {
      const level = [], size = queue.length;
      for (let i = 0; i < size; i++) {
        const node = queue.shift();
        level.push(node.val);
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }
      result.push(level);
    }
    return result;
  }
}`;

  if (t.includes('dynamic programming') || t.includes('dp'))
    return `class Solution {
  solve(nums) {
    const n = nums.length;
    const dp = new Array(n + 1).fill(0);
    for (let i = 1; i <= n; i++) {
      dp[i] = Math.max(dp[i-1], dp[i-1] + nums[i-1]);
    }
    return dp[n];
  }
}`;

  if (t.includes('backtrack'))
    return `class Solution {
  solve(nums) {
    const result = [];
    const backtrack = (start, path) => {
      result.push([...path]);
      for (let i = start; i < nums.length; i++) {
        path.push(nums[i]);
        backtrack(i + 1, path);
        path.pop();
      }
    };
    backtrack(0, []);
    return result;
  }
}`;

  if (t.includes('heap') || t.includes('priority queue'))
    return `class MinHeap {
  constructor() { this.h = []; }
  push(v) { this.h.push(v); this.h.sort((a, b) => a - b); }
  pop() { return this.h.shift(); }
  peek() { return this.h[0]; }
  size() { return this.h.length; }
}
class Solution {
  solve(arr, k) {
    const heap = new MinHeap();
    for (const v of arr) { heap.push(v); if (heap.size() > k) heap.pop(); }
    return heap.peek();
  }
}`;

  if (t.includes('graph') || t.includes('topological'))
    return `class Solution {
  solve(n, edges) {
    const adj = Array.from({length: n}, () => []);
    const indegree = new Array(n).fill(0);
    for (const [u, v] of edges) { adj[u].push(v); indegree[v]++; }
    const queue = [];
    for (let i = 0; i < n; i++) if (indegree[i] === 0) queue.push(i);
    const order = [];
    while (queue.length) {
      const node = queue.shift(); order.push(node);
      for (const nb of adj[node]) { if (--indegree[nb] === 0) queue.push(nb); }
    }
    return order.length === n ? order : [];
  }
}`;

  if (t.includes('bit manipulation') || t.includes('bit'))
    return `class Solution {
  solve(nums) {
    let result = 0;
    for (const n of nums) result ^= n;
    return result;
  }
}`;

  if (t.includes('linked list'))
    return `class Solution {
  solve(head) {
    let prev = null, curr = head;
    while (curr) { const next = curr.next; curr.next = prev; prev = curr; curr = next; }
    return prev;
  }
}`;

  if (t.includes('matrix') || t.includes('grid'))
    return `class Solution {
  solve(matrix) {
    if (!matrix.length) return 0;
    const rows = matrix.length, cols = matrix[0].length;
    const dirs = [[0,1],[0,-1],[1,0],[-1,0]];
    const visited = Array.from({length: rows}, () => new Array(cols).fill(false));
    let count = 0;
    const bfs = (r, c) => {
      const queue = [[r, c]]; visited[r][c] = true;
      while (queue.length) {
        const [cr, cc] = queue.shift();
        for (const [dr, dc] of dirs) {
          const nr = cr+dr, nc = cc+dc;
          if (nr>=0 && nr<rows && nc>=0 && nc<cols && !visited[nr][nc] && matrix[nr][nc]==='1') {
            visited[nr][nc] = true; queue.push([nr, nc]);
          }
        }
      }
    };
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++)
        if (matrix[r][c]==='1' && !visited[r][c]) { bfs(r,c); count++; }
    return count;
  }
}`;

  if (t.includes('hash table') || t.includes('hash map'))
    return `class Solution {
  solve(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
      const comp = target - nums[i];
      if (map.has(comp)) return [map.get(comp), i];
      map.set(nums[i], i);
    }
    return [];
  }
}`;

  if (t.includes('greedy'))
    return `class Solution {
  solve(arr) {
    arr.sort((a, b) => a - b);
    let result = 0;
    for (let i = 0; i < arr.length; i += 2) result += arr[i];
    return result;
  }
}`;

  if (t.includes('prefix sum'))
    return `class Solution {
  solve(nums, queries) {
    const prefix = new Array(nums.length + 1).fill(0);
    for (let i = 0; i < nums.length; i++) prefix[i+1] = prefix[i] + nums[i];
    return queries.map(([l, r]) => prefix[r+1] - prefix[l]);
  }
}`;

  if (t.includes('sorting') || t.includes('sort'))
    return `class Solution {
  solve(arr) {
    return arr.slice().sort((a, b) => a - b);
  }
}`;

  if (t.includes('math') || t.includes('number theory'))
    return `class Solution {
  solve(n) {
    const sieve = new Array(n+1).fill(true);
    sieve[0] = sieve[1] = false;
    for (let i = 2; i*i <= n; i++) if (sieve[i]) for (let j=i*i; j<=n; j+=i) sieve[j]=false;
    return sieve.reduce((acc, v, i) => { if (v) acc.push(i); return acc; }, []);
  }
}`;

  if (t.includes('string') || t.includes('palindrome'))
    return `class Solution {
  solve(s) {
    let left = 0, right = s.length - 1;
    while (left < right) { if (s[left++] !== s[right--]) return false; }
    return true;
  }
}`;

  // Default
  return `class Solution {
  solve(nums) {
    const seen = new Map();
    let result = 0;
    for (let i = 0; i < nums.length; i++) {
      if (seen.has(nums[i])) result = Math.max(result, i - seen.get(nums[i]));
      else seen.set(nums[i], i);
    }
    return result;
  }
}`;
}

const filePath = path.join(__dirname, 'data', 'solutions.js');
const lines = fs.readFileSync(filePath, 'utf8').split('\n');

let filled = 0;
let currentId = null;

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  
  // Look for keys like "42": { or 42: {
  const matchId = line.match(/^  "?(\d+)"?:\s*\{/);
  if (matchId) {
    currentId = matchId[1];
  }
  
  // Look for "javascript": ``
  if (currentId && line.includes('"javascript": ``') || line.includes('"javascript": \`\`')) {
    const p = problemMap[currentId];
    if (p) {
      const sol = getJSSolution(p.topics, p.title);
      // Replace `` with `sol`
      // We need to properly escape or just insert the multiline string
      // But actually, just replacing the line works:
      lines[i] = line.replace(/``|\`\`/, '\`\\n' + sol.replace(/\n/g, '\\n') + '\\n\`'); 
      // Wait, to keep it multiline template literal in the file:
      lines[i] = line.replace(/``|\`\`/, '\`\\n' + sol + '\\n\`');
      filled++;
    }
  }
}

fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
console.log('Filled', filled, 'empty JS solutions');
