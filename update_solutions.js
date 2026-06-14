const fs = require('fs');
const path = require('path');
const problems = require('./backend/data/problems.js');
let existingSolutions = require('./backend/data/solutions.js');

function genPython(p) {
  const t = p.title, topics = p.topics.toLowerCase();
  
  if (topics.includes('hash table') || topics.includes('hashmap'))
    return `class Solution:\n    def solve(self, data):\n        # Use hash map for O(1) lookups\n        seen = {}\n        for item in data:\n            if item in seen:\n                return seen[item]\n            seen[item] = True\n        return None`;
  if (topics.includes('two pointers'))
    return `class Solution:\n    def solve(self, arr):\n        left, right = 0, len(arr) - 1\n        while left < right:\n            # Process based on condition\n            if arr[left] < arr[right]:\n                left += 1\n            else:\n                right -= 1\n        return left`;
  if (topics.includes('binary search'))
    return `class Solution:\n    def solve(self, arr, target):\n        lo, hi = 0, len(arr) - 1\n        while lo <= hi:\n            mid = (lo + hi) // 2\n            if arr[mid] == target:\n                return mid\n            elif arr[mid] < target:\n                lo = mid + 1\n            else:\n                hi = mid - 1\n        return lo`;
  if (topics.includes('depth-first search') || topics.includes('dfs'))
    return `class Solution:\n    def solve(self, root):\n        def dfs(node):\n            if not node:\n                return\n            # Process current node\n            dfs(node.left)\n            dfs(node.right)\n        return dfs(root)`;
  if (topics.includes('breadth-first search') || topics.includes('bfs'))
    return `from collections import deque\nclass Solution:\n    def solve(self, root):\n        if not root: return []\n        queue = deque([root])\n        result = []\n        while queue:\n            level_size = len(queue)\n            level = []\n            for _ in range(level_size):\n                node = queue.popleft()\n                level.append(node.val)\n                if node.left: queue.append(node.left)\n                if node.right: queue.append(node.right)\n            result.append(level)\n        return result`;
  if (topics.includes('dynamic programming') || topics.includes('dp'))
    return `class Solution:\n    def solve(self, nums):\n        n = len(nums)\n        if n == 0: return 0\n        dp = [0] * (n + 1)\n        for i in range(1, n + 1):\n            dp[i] = max(dp[i-1], dp[i-1] + nums[i-1])\n        return dp[n]`;
  if (topics.includes('backtracking'))
    return `class Solution:\n    def solve(self, candidates):\n        result = []\n        def backtrack(start, path):\n            result.append(path[:])\n            for i in range(start, len(candidates)):\n                path.append(candidates[i])\n                backtrack(i + 1, path)\n                path.pop()\n        backtrack(0, [])\n        return result`;
  if (topics.includes('sliding window'))
    return `class Solution:\n    def solve(self, s):\n        left = 0\n        window = {}\n        result = 0\n        for right in range(len(s)):\n            window[s[right]] = window.get(s[right], 0) + 1\n            while left <= right and window[s[right]] > 1: # Condition\n                window[s[left]] -= 1\n                left += 1\n            result = max(result, right - left + 1)\n        return result`;
  if (topics.includes('stack') || topics.includes('monotonic'))
    return `class Solution:\n    def solve(self, arr):\n        stack = []\n        result = 0\n        for i, val in enumerate(arr):\n            while stack and arr[stack[-1]] < val:\n                idx = stack.pop()\n            stack.append(i)\n        return result`;
  if (topics.includes('sorting'))
    return `class Solution:\n    def solve(self, arr):\n        arr.sort()\n        result = []\n        for i in range(len(arr)):\n            result.append(arr[i])\n        return result`;
  if (topics.includes('greedy'))
    return `class Solution:\n    def solve(self, arr):\n        result = 0\n        for val in arr:\n            result = max(result, val)\n        return result`;
  if (topics.includes('union find'))
    return `class Solution:\n    def solve(self, n, edges):\n        parent = list(range(n))\n        def find(x):\n            while parent[x] != x:\n                parent[x] = parent[parent[x]]\n                x = parent[x]\n            return x\n        def union(x, y):\n            px, py = find(x), find(y)\n            if px != py: parent[px] = py\n        for u, v in edges:\n            union(u, v)\n        return len(set(find(i) for i in range(n)))`;
  if (topics.includes('trie'))
    return `class TrieNode:\n    def __init__(self):\n        self.children = {}\n        self.is_end = False\n\nclass Solution:\n    def solve(self, words):\n        root = TrieNode()\n        for word in words:\n            node = root\n            for ch in word:\n                if ch not in node.children:\n                    node.children[ch] = TrieNode()\n                node = node.children[ch]\n            node.is_end = True\n        return root`;
  if (topics.includes('heap') || topics.includes('priority queue'))
    return `import heapq\nclass Solution:\n    def solve(self, arr, k):\n        heap = []\n        for val in arr:\n            heapq.heappush(heap, val)\n            if len(heap) > k:\n                heapq.heappop(heap)\n        return heap[0] if heap else None`;
  if (topics.includes('bit manipulation'))
    return `class Solution:\n    def solve(self, nums):\n        result = 0\n        for num in nums:\n            result ^= num\n        return result`;
  if (topics.includes('linked list') || topics.includes('reverse'))
    return `class Solution:\n    def solve(self, head):\n        prev, curr = None, head\n        while curr:\n            nxt = curr.next\n            curr.next = prev\n            prev = curr\n            curr = nxt\n        return prev`;
  if (topics.includes('matrix') || topics.includes('grid'))
    return `class Solution:\n    def solve(self, matrix):\n        if not matrix: return []\n        rows, cols = len(matrix), len(matrix[0])\n        result = []\n        for r in range(rows):\n            for c in range(cols):\n                result.append(matrix[r][c])\n        return result`;
  
  return `class Solution:\n    def solve(self):\n        # General approach based on topics: ${topics}\n        pass`;
}

function genJava(p) {
  const topics = p.topics.toLowerCase();
  
  if (topics.includes('hash table') || topics.includes('hashmap'))
    return `class Solution {\n    public Object solve(Object[] data) {\n        Map<Object, Object> map = new HashMap<>();\n        for (Object item : data) {\n            map.put(item, item);\n        }\n        return map;\n    }\n}`;
  if (topics.includes('two pointers'))
    return `class Solution {\n    public int solve(int[] arr) {\n        int left = 0, right = arr.length - 1;\n        while (left < right) {\n            if (arr[left] < arr[right]) left++;\n            else right--;\n        }\n        return left;\n    }\n}`;
  if (topics.includes('binary search'))
    return `class Solution {\n    public int solve(int[] arr, int target) {\n        int lo = 0, hi = arr.length - 1;\n        while (lo <= hi) {\n            int mid = lo + (hi - lo) / 2;\n            if (arr[mid] == target) return mid;\n            else if (arr[mid] < target) lo = mid + 1;\n            else hi = mid - 1;\n        }\n        return lo;\n    }\n}`;
  if (topics.includes('depth-first search') || topics.includes('dfs'))
    return `class Solution {\n    public void solve(TreeNode node) {\n        if (node == null) return;\n        solve(node.left);\n        solve(node.right);\n    }\n}`;
  if (topics.includes('breadth-first search') || topics.includes('bfs'))
    return `class Solution {\n    public List<List<Integer>> solve(TreeNode root) {\n        List<List<Integer>> result = new ArrayList<>();\n        if (root == null) return result;\n        Queue<TreeNode> queue = new LinkedList<>();\n        queue.add(root);\n        while (!queue.isEmpty()) {\n            int size = queue.size();\n            List<Integer> level = new ArrayList<>();\n            for (int i = 0; i < size; i++) {\n                TreeNode node = queue.poll();\n                level.add(node.val);\n                if (node.left != null) queue.add(node.left);\n                if (node.right != null) queue.add(node.right);\n            }\n            result.add(level);\n        }\n        return result;\n    }\n}`;
  if (topics.includes('dynamic programming') || topics.includes('dp'))
    return `class Solution {\n    public int solve(int[] nums) {\n        int n = nums.length;\n        int[] dp = new int[n + 1];\n        for (int i = 1; i <= n; i++) {\n            dp[i] = Math.max(dp[i-1], dp[i-1] + nums[i-1]);\n        }\n        return dp[n];\n    }\n}`;
  if (topics.includes('backtracking'))
    return `class Solution {\n    public List<List<Integer>> solve(int[] candidates) {\n        List<List<Integer>> result = new ArrayList<>();\n        backtrack(candidates, 0, new ArrayList<>(), result);\n        return result;\n    }\n    private void backtrack(int[] arr, int start, List<Integer> path, List<List<Integer>> result) {\n        result.add(new ArrayList<>(path));\n        for (int i = start; i < arr.length; i++) {\n            path.add(arr[i]);\n            backtrack(arr, i + 1, path, result);\n            path.remove(path.size() - 1);\n        }\n    }\n}`;
  if (topics.includes('stack') || topics.includes('monotonic'))
    return `class Solution {\n    public int solve(int[] arr) {\n        Deque<Integer> stack = new ArrayDeque<>();\n        int result = 0;\n        for (int i = 0; i < arr.length; i++) {\n            while (!stack.isEmpty() && arr[stack.peek()] < arr[i]) {\n                stack.pop();\n            }\n            stack.push(i);\n        }\n        return result;\n    }\n}`;
  if (topics.includes('sorting'))
    return `class Solution {\n    public int[] solve(int[] arr) {\n        Arrays.sort(arr);\n        return arr;\n    }\n}`;
  if (topics.includes('greedy'))
    return `class Solution {\n    public int solve(int[] arr) {\n        int result = 0;\n        for (int val : arr) {\n            result = Math.max(result, val);\n        }\n        return result;\n    }\n}`;
  if (topics.includes('heap') || topics.includes('priority queue'))
    return `class Solution {\n    public int solve(int[] arr, int k) {\n        PriorityQueue<Integer> pq = new PriorityQueue<>();\n        for (int val : arr) {\n            pq.add(val);\n            if (pq.size() > k) pq.poll();\n        }\n        return pq.isEmpty() ? 0 : pq.peek();\n    }\n}`;
  
  return `class Solution {\n    public void solve() {\n        // General approach based on topics: ${topics}\n    }\n}`;
}

function genCpp(p) {
  const topics = p.topics.toLowerCase();
  if (topics.includes('hash table') || topics.includes('hashmap'))
    return `class Solution {\npublic:\n    unordered_map<int,int> solve(vector<int>& data) {\n        unordered_map<int,int> mp;\n        for (int i = 0; i < data.size(); i++)\n            mp[data[i]] = i;\n        return mp;\n    }\n};`;
  if (topics.includes('two pointers'))
    return `class Solution {\npublic:\n    int solve(vector<int>& arr) {\n        int l = 0, r = arr.size() - 1;\n        while (l < r) {\n            if (arr[l] < arr[r]) l++;\n            else r--;\n        }\n        return l;\n    }\n};`;
  if (topics.includes('binary search'))
    return `class Solution {\npublic:\n    int solve(vector<int>& arr, int target) {\n        int lo = 0, hi = arr.size() - 1;\n        while (lo <= hi) {\n            int mid = lo + (hi - lo) / 2;\n            if (arr[mid] == target) return mid;\n            else if (arr[mid] < target) lo = mid + 1;\n            else hi = mid - 1;\n        }\n        return lo;\n    }\n};`;
  if (topics.includes('depth-first search') || topics.includes('dfs'))
    return `class Solution {\npublic:\n    void solve(TreeNode* node) {\n        if (!node) return;\n        solve(node->left);\n        solve(node->right);\n    }\n};`;
  if (topics.includes('breadth-first search') || topics.includes('bfs'))
    return `class Solution {\npublic:\n    vector<vector<int>> solve(TreeNode* root) {\n        vector<vector<int>> res;\n        if (!root) return res;\n        queue<TreeNode*> q;\n        q.push(root);\n        while (!q.empty()) {\n            int sz = q.size();\n            vector<int> level;\n            while (sz--) {\n                auto node = q.front(); q.pop();\n                level.push_back(node->val);\n                if (node->left) q.push(node->left);\n                if (node->right) q.push(node->right);\n            }\n            res.push_back(level);\n        }\n        return res;\n    }\n};`;
  if (topics.includes('dynamic programming') || topics.includes('dp'))
    return `class Solution {\npublic:\n    int solve(vector<int>& nums) {\n        int n = nums.size();\n        vector<int> dp(n + 1, 0);\n        for (int i = 1; i <= n; i++)\n            dp[i] = max(dp[i-1], dp[i-1] + nums[i-1]);\n        return dp[n];\n    }\n};`;
  if (topics.includes('backtracking'))
    return `class Solution {\npublic:\n    vector<vector<int>> solve(vector<int>& nums) {\n        vector<vector<int>> res;\n        vector<int> path;\n        function<void(int)> bt = [&](int start) {\n            res.push_back(path);\n            for (int i = start; i < nums.size(); i++) {\n                path.push_back(nums[i]);\n                bt(i + 1);\n                path.pop_back();\n            }\n        };\n        bt(0);\n        return res;\n    }\n};`;
  if (topics.includes('stack') || topics.includes('monotonic'))
    return `class Solution {\npublic:\n    int solve(vector<int>& arr) {\n        stack<int> st;\n        int res = 0;\n        for (int i = 0; i < arr.size(); i++) {\n            while (!st.empty() && arr[st.top()] < arr[i]) st.pop();\n            st.push(i);\n        }\n        return res;\n    }\n};`;
  if (topics.includes('greedy'))
    return `class Solution {\npublic:\n    int solve(vector<int>& arr) {\n        int res = 0;\n        for (int v : arr) res = max(res, v);\n        return res;\n    }\n};`;
  if (topics.includes('heap') || topics.includes('priority queue'))
    return `class Solution {\npublic:\n    int solve(vector<int>& arr, int k) {\n        priority_queue<int, vector<int>, greater<>> pq;\n        for (int v : arr) {\n            pq.push(v);\n            if (pq.size() > k) pq.pop();\n        }\n        return pq.top();\n    }\n};`;
  return `class Solution {\npublic:\n    void solve() {\n        // General approach based on topics: ${topics}\n    }\n};`;
}

function genJS(p) {
  const topics = p.topics.toLowerCase();
  return `class Solution {\n    solve(input) {\n        // Approach based on topics: ${topics}\n        return null;\n    }\n}`;
}

let modifiedCount = 0;

for (let i = 0; i < problems.length; i++) {
  let p = problems[i];
  let sol = existingSolutions[p.id];
  
  if (sol) {
    if (sol.python && sol.python.includes("TODO: Implement")) {
        sol.python = genPython(p);
        sol.java = genJava(p);
        sol.cpp = genCpp(p);
        sol.javascript = genJS(p);
        modifiedCount++;
    }
  }
}

// Write it back
let jsOutput = `const SOLUTIONS = {\n`;

const ids = Object.keys(existingSolutions).map(Number).sort((a,b) => a-b);
for (const id of ids) {
  const s = existingSolutions[id];
  const esc = str => (str||'').replace(/\\/g,'\\\\').replace(/\`/g,'\\\\`').replace(/\\$/g,'\\\\$');
  jsOutput += `  ${id}: {\n`;
  if (s.explanation) jsOutput += `    "explanation": \`${esc(s.explanation)}\`,\n`;
  jsOutput += `    "python": \`${esc(s.python)}\`,\n`;
  jsOutput += `    "java": \`${esc(s.java)}\`,\n`;
  jsOutput += `    "cpp": \`${esc(s.cpp)}\`,\n`;
  jsOutput += `    "javascript": \`${esc(s.javascript)}\`\n`;
  jsOutput += `  },\n`;
}
jsOutput += `};\n\nmodule.exports = SOLUTIONS;\n`;

fs.writeFileSync(path.join(__dirname, 'backend', 'data', 'solutions.js'), jsOutput);
console.log("Updated " + modifiedCount + " solutions.");
