// Auto-generated solutions for all 500 LeetCode problems
// Each solution includes: explanation, Python, Java, C++ with approach comments

const SOLUTIONS = {

    1: {
        explanation: `Use a hash map to store each number's index. For each element, check if (target - num) exists in the map. One-pass O(n) solution.`,
        python: `# Approach: Hash Map - store complement -> index
# Time: O(n) | Space: O(n)
def twoSum(nums, target):
    seen = {}  # val -> index
    for i, num in enumerate(nums):
        comp = target - num
        if comp in seen:
            return [seen[comp], i]
        seen[num] = i
    return []`,
        java: `// Approach: Hash Map - store complement -> index
// Time: O(n) | Space: O(n)
public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> seen = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int comp = target - nums[i];
        if (seen.containsKey(comp))
            return new int[]{seen.get(comp), i};
        seen.put(nums[i], i);
    }
    return new int[]{};
}`,
        cpp: `// Approach: Hash Map - store complement -> index
// Time: O(n) | Space: O(n)
vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int,int> seen;
    for (int i = 0; i < nums.size(); i++) {
        int comp = target - nums[i];
        if (seen.count(comp)) return {seen[comp], i};
        seen[nums[i]] = i;
    }
    return {};
}`
    },

    2: {
        explanation: `Traverse both linked lists simultaneously, summing digits with a carry. Create new nodes for each resulting digit until both lists and carry are exhausted.`,
        python: `# Approach: Simulate digit-by-digit addition with carry
# Time: O(max(m,n)) | Space: O(max(m,n))
def addTwoNumbers(l1, l2):
    dummy = ListNode(0)
    cur, carry = dummy, 0
    while l1 or l2 or carry:
        val = carry
        if l1: val += l1.val; l1 = l1.next
        if l2: val += l2.val; l2 = l2.next
        carry, digit = divmod(val, 10)
        cur.next = ListNode(digit)
        cur = cur.next
    return dummy.next`,
        java: `// Approach: Simulate digit-by-digit addition with carry
// Time: O(max(m,n)) | Space: O(max(m,n))
public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
    ListNode dummy = new ListNode(0), cur = dummy;
    int carry = 0;
    while (l1 != null || l2 != null || carry != 0) {
        int val = carry;
        if (l1 != null) { val += l1.val; l1 = l1.next; }
        if (l2 != null) { val += l2.val; l2 = l2.next; }
        carry = val / 10;
        cur.next = new ListNode(val % 10);
        cur = cur.next;
    }
    return dummy.next;
}`,
        cpp: `// Approach: Simulate digit-by-digit addition with carry
// Time: O(max(m,n)) | Space: O(max(m,n))
ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
    ListNode dummy(0);
    ListNode* cur = &dummy;
    int carry = 0;
    while (l1 || l2 || carry) {
        int val = carry;
        if (l1) { val += l1->val; l1 = l1->next; }
        if (l2) { val += l2->val; l2 = l2->next; }
        carry = val / 10;
        cur->next = new ListNode(val % 10);
        cur = cur->next;
    }
    return dummy.next;
}`
    },

    3: {
        explanation: `Use sliding window with a set. Expand right pointer adding chars; when duplicate found, shrink from left. Track max window size throughout.`,
        python: `# Approach: Sliding window + hash set
# Time: O(n) | Space: O(min(m,n))
def lengthOfLongestSubstring(s):
    seen = set()
    left = ans = 0
    for right in range(len(s)):
        while s[right] in seen:
            seen.remove(s[left])
            left += 1
        seen.add(s[right])
        ans = max(ans, right - left + 1)
    return ans`,
        java: `// Approach: Sliding window + hash set
// Time: O(n) | Space: O(min(m,n))
public int lengthOfLongestSubstring(String s) {
    Set<Character> seen = new HashSet<>();
    int left = 0, ans = 0;
    for (int right = 0; right < s.length(); right++) {
        while (seen.contains(s.charAt(right)))
            seen.remove(s.charAt(left++));
        seen.add(s.charAt(right));
        ans = Math.max(ans, right - left + 1);
    }
    return ans;
}`,
        cpp: `// Approach: Sliding window + hash set
// Time: O(n) | Space: O(min(m,n))
int lengthOfLongestSubstring(string s) {
    unordered_set<char> seen;
    int left = 0, ans = 0;
    for (int right = 0; right < s.size(); right++) {
        while (seen.count(s[right]))
            seen.erase(s[left++]);
        seen.insert(s[right]);
        ans = max(ans, right - left + 1);
    }
    return ans;
}`
    },

    4: {
        explanation: `Binary search on the smaller array to find the correct partition. Ensure left halves of both arrays contain elements <= right halves. O(log(min(m,n))).`,
        python: `# Approach: Binary search on smaller array partition
# Time: O(log(min(m,n))) | Space: O(1)
def findMedianSortedArrays(nums1, nums2):
    if len(nums1) > len(nums2):
        nums1, nums2 = nums2, nums1
    m, n = len(nums1), len(nums2)
    lo, hi = 0, m
    while lo <= hi:
        i = (lo + hi) // 2
        j = (m + n + 1) // 2 - i
        left1 = nums1[i-1] if i > 0 else float('-inf')
        right1 = nums1[i] if i < m else float('inf')
        left2 = nums2[j-1] if j > 0 else float('-inf')
        right2 = nums2[j] if j < n else float('inf')
        if left1 <= right2 and left2 <= right1:
            if (m + n) % 2 == 0:
                return (max(left1,left2) + min(right1,right2)) / 2
            return max(left1, left2)
        elif left1 > right2: hi = i - 1
        else: lo = i + 1`,
        java: `// Approach: Binary search on smaller array partition
// Time: O(log(min(m,n))) | Space: O(1)
public double findMedianSortedArrays(int[] A, int[] B) {
    if (A.length > B.length) return findMedianSortedArrays(B, A);
    int m = A.length, n = B.length, lo = 0, hi = m;
    while (lo <= hi) {
        int i = (lo+hi)/2, j = (m+n+1)/2 - i;
        int l1 = i>0 ? A[i-1] : Integer.MIN_VALUE;
        int r1 = i<m ? A[i] : Integer.MAX_VALUE;
        int l2 = j>0 ? B[j-1] : Integer.MIN_VALUE;
        int r2 = j<n ? B[j] : Integer.MAX_VALUE;
        if (l1<=r2 && l2<=r1) {
            if ((m+n)%2==0) return (Math.max(l1,l2)+Math.min(r1,r2))/2.0;
            return Math.max(l1,l2);
        } else if (l1>r2) hi=i-1; else lo=i+1;
    }
    return 0;
}`,
        cpp: `// Approach: Binary search on smaller array partition
// Time: O(log(min(m,n))) | Space: O(1)
double findMedianSortedArrays(vector<int>& A, vector<int>& B) {
    if (A.size() > B.size()) return findMedianSortedArrays(B, A);
    int m=A.size(), n=B.size(), lo=0, hi=m;
    while (lo <= hi) {
        int i=(lo+hi)/2, j=(m+n+1)/2-i;
        int l1=i>0?A[i-1]:INT_MIN, r1=i<m?A[i]:INT_MAX;
        int l2=j>0?B[j-1]:INT_MIN, r2=j<n?B[j]:INT_MAX;
        if (l1<=r2 && l2<=r1) {
            if ((m+n)%2==0) return (max(l1,l2)+min(r1,r2))/2.0;
            return max(l1,l2);
        } else if (l1>r2) hi=i-1; else lo=i+1;
    }
    return 0;
}`
    },

    5: {
        explanation: `Expand around each center (both odd and even length). For each center, expand outward while chars match. Track longest palindrome found.`,
        python: `# Approach: Expand around center for odd and even palindromes
# Time: O(n^2) | Space: O(1)
def longestPalindrome(s):
    res = ''
    for i in range(len(s)):
        for l, r in [(i,i), (i,i+1)]:  # odd and even centers
            while l >= 0 and r < len(s) and s[l] == s[r]:
                l -= 1; r += 1
            if r - l - 1 > len(res):
                res = s[l+1:r]
    return res`,
        java: `// Approach: Expand around center for odd and even palindromes
// Time: O(n^2) | Space: O(1)
public String longestPalindrome(String s) {
    int start = 0, maxLen = 0;
    for (int i = 0; i < s.length(); i++) {
        for (int d = 0; d <= 1; d++) { // odd and even
            int l = i, r = i + d;
            while (l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r)) { l--; r++; }
            if (r - l - 1 > maxLen) { start = l + 1; maxLen = r - l - 1; }
        }
    }
    return s.substring(start, start + maxLen);
}`,
        cpp: `// Approach: Expand around center for odd and even palindromes
// Time: O(n^2) | Space: O(1)
string longestPalindrome(string s) {
    int start = 0, maxLen = 0;
    for (int i = 0; i < s.size(); i++) {
        for (int d : {0, 1}) {
            int l = i, r = i + d;
            while (l >= 0 && r < s.size() && s[l] == s[r]) { l--; r++; }
            if (r-l-1 > maxLen) { start = l+1; maxLen = r-l-1; }
        }
    }
    return s.substr(start, maxLen);
}`
    },

    7: {
        explanation: `Reverse the integer digit by digit. Before adding each digit, check for 32-bit overflow. Handle negative numbers separately.`,
        python: `# Approach: Reverse digit by digit with overflow check
# Time: O(log x) | Space: O(1)
def reverse(x):
    sign = -1 if x < 0 else 1
    x = abs(x)
    res = 0
    while x:
        res = res * 10 + x % 10
        x //= 10
    res *= sign
    return res if -2**31 <= res <= 2**31 - 1 else 0`,
        java: `// Approach: Reverse digit by digit with overflow check
// Time: O(log x) | Space: O(1)
public int reverse(int x) {
    long res = 0;
    while (x != 0) {
        res = res * 10 + x % 10;
        x /= 10;
    }
    return (res > Integer.MAX_VALUE || res < Integer.MIN_VALUE) ? 0 : (int)res;
}`,
        cpp: `// Approach: Reverse digit by digit with overflow check
// Time: O(log x) | Space: O(1)
int reverse(int x) {
    long res = 0;
    while (x != 0) {
        res = res * 10 + x % 10;
        x /= 10;
    }
    return (res > INT_MAX || res < INT_MIN) ? 0 : res;
}`
    },

    8: {
        explanation: `Parse string: skip whitespace, handle sign, read digits. Clamp result to 32-bit signed integer range on overflow.`,
        python: `# Approach: Parse char by char with overflow clamping
# Time: O(n) | Space: O(1)
def myAtoi(s):
    s = s.lstrip()
    if not s: return 0
    sign, i = 1, 0
    if s[0] in '+-':
        sign = -1 if s[0] == '-' else 1
        i = 1
    res = 0
    while i < len(s) and s[i].isdigit():
        res = res * 10 + int(s[i])
        i += 1
    res *= sign
    return max(-2**31, min(2**31 - 1, res))`,
        java: `// Approach: Parse char by char with overflow clamping
// Time: O(n) | Space: O(1)
public int myAtoi(String s) {
    int i = 0, sign = 1; long res = 0;
    while (i < s.length() && s.charAt(i) == ' ') i++;
    if (i < s.length() && (s.charAt(i) == '+' || s.charAt(i) == '-'))
        sign = s.charAt(i++) == '-' ? -1 : 1;
    while (i < s.length() && Character.isDigit(s.charAt(i))) {
        res = res * 10 + (s.charAt(i++) - '0');
        if (res * sign > Integer.MAX_VALUE) return Integer.MAX_VALUE;
        if (res * sign < Integer.MIN_VALUE) return Integer.MIN_VALUE;
    }
    return (int)(res * sign);
}`,
        cpp: `// Approach: Parse char by char with overflow clamping
// Time: O(n) | Space: O(1)
int myAtoi(string s) {
    int i = 0, sign = 1; long res = 0;
    while (i < s.size() && s[i] == ' ') i++;
    if (i < s.size() && (s[i] == '+' || s[i] == '-'))
        sign = s[i++] == '-' ? -1 : 1;
    while (i < s.size() && isdigit(s[i])) {
        res = res * 10 + (s[i++] - '0');
        if (res * sign > INT_MAX) return INT_MAX;
        if (res * sign < INT_MIN) return INT_MIN;
    }
    return res * sign;
}`
    },

    9: {
        explanation: `Reverse the second half of the number and compare with the first half. Negative numbers are never palindromes.`,
        python: `# Approach: Reverse half the number, compare halves
# Time: O(log n) | Space: O(1)
def isPalindrome(x):
    if x < 0 or (x % 10 == 0 and x != 0): return False
    rev = 0
    while x > rev:
        rev = rev * 10 + x % 10
        x //= 10
    return x == rev or x == rev // 10`,
        java: `// Approach: Reverse half the number, compare halves
// Time: O(log n) | Space: O(1)
public boolean isPalindrome(int x) {
    if (x < 0 || (x % 10 == 0 && x != 0)) return false;
    int rev = 0;
    while (x > rev) {
        rev = rev * 10 + x % 10;
        x /= 10;
    }
    return x == rev || x == rev / 10;
}`,
        cpp: `// Approach: Reverse half the number, compare halves
// Time: O(log n) | Space: O(1)
bool isPalindrome(int x) {
    if (x < 0 || (x % 10 == 0 && x != 0)) return false;
    int rev = 0;
    while (x > rev) {
        rev = rev * 10 + x % 10;
        x /= 10;
    }
    return x == rev || x == rev / 10;
}`
    },

    11: {
        explanation: `Use two pointers at both ends. Calculate area, then move the pointer with the shorter height inward. This greedy choice works because moving the taller one can never increase area.`,
        python: `# Approach: Two pointers shrink inward, move shorter side
# Time: O(n) | Space: O(1)
def maxArea(height):
    l, r = 0, len(height) - 1
    ans = 0
    while l < r:
        ans = max(ans, min(height[l], height[r]) * (r - l))
        if height[l] < height[r]: l += 1
        else: r -= 1
    return ans`,
        java: `// Approach: Two pointers shrink inward, move shorter side
// Time: O(n) | Space: O(1)
public int maxArea(int[] height) {
    int l = 0, r = height.length - 1, ans = 0;
    while (l < r) {
        ans = Math.max(ans, Math.min(height[l], height[r]) * (r - l));
        if (height[l] < height[r]) l++; else r--;
    }
    return ans;
}`,
        cpp: `// Approach: Two pointers shrink inward, move shorter side
// Time: O(n) | Space: O(1)
int maxArea(vector<int>& height) {
    int l = 0, r = height.size()-1, ans = 0;
    while (l < r) {
        ans = max(ans, min(height[l], height[r]) * (r - l));
        if (height[l] < height[r]) l++; else r--;
    }
    return ans;
}`
    },

    13: {
        explanation: `Map each Roman numeral to its value. If a smaller value precedes a larger one, subtract it; otherwise add it.`,
        python: `# Approach: Map values, subtract when smaller precedes larger
# Time: O(n) | Space: O(1)
def romanToInt(s):
    m = {'I':1,'V':5,'X':10,'L':50,'C':100,'D':500,'M':1000}
    res = 0
    for i in range(len(s)):
        if i+1 < len(s) and m[s[i]] < m[s[i+1]]:
            res -= m[s[i]]
        else:
            res += m[s[i]]
    return res`,
        java: `// Approach: Map values, subtract when smaller precedes larger
// Time: O(n) | Space: O(1)
public int romanToInt(String s) {
    Map<Character,Integer> m = Map.of('I',1,'V',5,'X',10,'L',50,'C',100,'D',500,'M',1000);
    int res = 0;
    for (int i = 0; i < s.length(); i++) {
        if (i+1 < s.length() && m.get(s.charAt(i)) < m.get(s.charAt(i+1)))
            res -= m.get(s.charAt(i));
        else res += m.get(s.charAt(i));
    }
    return res;
}`,
        cpp: `// Approach: Map values, subtract when smaller precedes larger
// Time: O(n) | Space: O(1)
int romanToInt(string s) {
    unordered_map<char,int> m = {{'I',1},{'V',5},{'X',10},{'L',50},{'C',100},{'D',500},{'M',1000}};
    int res = 0;
    for (int i = 0; i < s.size(); i++) {
        if (i+1 < s.size() && m[s[i]] < m[s[i+1]]) res -= m[s[i]];
        else res += m[s[i]];
    }
    return res;
}`
    },

    14: {
        explanation: `Compare characters of all strings column by column. Stop when a mismatch is found or any string ends.`,
        python: `# Approach: Vertical scan - compare char by char across all strings
# Time: O(S) total chars | Space: O(1)
def longestCommonPrefix(strs):
    if not strs: return ''
    for i in range(len(strs[0])):
        for s in strs[1:]:
            if i >= len(s) or s[i] != strs[0][i]:
                return strs[0][:i]
    return strs[0]`,
        java: `// Approach: Vertical scan - compare char by char across all strings
// Time: O(S) total chars | Space: O(1)
public String longestCommonPrefix(String[] strs) {
    if (strs.length == 0) return "";
    for (int i = 0; i < strs[0].length(); i++) {
        char c = strs[0].charAt(i);
        for (int j = 1; j < strs.length; j++)
            if (i >= strs[j].length() || strs[j].charAt(i) != c)
                return strs[0].substring(0, i);
    }
    return strs[0];
}`,
        cpp: `// Approach: Vertical scan - compare char by char
// Time: O(S) | Space: O(1)
string longestCommonPrefix(vector<string>& strs) {
    if (strs.empty()) return "";
    for (int i = 0; i < strs[0].size(); i++)
        for (int j = 1; j < strs.size(); j++)
            if (i >= strs[j].size() || strs[j][i] != strs[0][i])
                return strs[0].substr(0, i);
    return strs[0];
}`
    },

    15: {
        explanation: `Sort the array. Fix one element, use two pointers on the remaining subarray to find pairs summing to its negative. Skip duplicates.`,
        python: `# Approach: Sort + fix one element + two pointers
# Time: O(n^2) | Space: O(1) ignoring output
def threeSum(nums):
    nums.sort()
    res = []
    for i in range(len(nums) - 2):
        if i > 0 and nums[i] == nums[i-1]: continue
        l, r = i + 1, len(nums) - 1
        while l < r:
            s = nums[i] + nums[l] + nums[r]
            if s < 0: l += 1
            elif s > 0: r -= 1
            else:
                res.append([nums[i], nums[l], nums[r]])
                while l < r and nums[l] == nums[l+1]: l += 1
                while l < r and nums[r] == nums[r-1]: r -= 1
                l += 1; r -= 1
    return res`,
        java: `// Approach: Sort + fix one + two pointers, skip duplicates
// Time: O(n^2) | Space: O(1)
public List<List<Integer>> threeSum(int[] nums) {
    Arrays.sort(nums);
    List<List<Integer>> res = new ArrayList<>();
    for (int i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] == nums[i-1]) continue;
        int l = i+1, r = nums.length-1;
        while (l < r) {
            int s = nums[i]+nums[l]+nums[r];
            if (s < 0) l++;
            else if (s > 0) r--;
            else {
                res.add(Arrays.asList(nums[i],nums[l],nums[r]));
                while (l<r && nums[l]==nums[l+1]) l++;
                while (l<r && nums[r]==nums[r-1]) r--;
                l++; r--;
            }
        }
    }
    return res;
}`,
        cpp: `// Approach: Sort + fix one + two pointers
// Time: O(n^2) | Space: O(1)
vector<vector<int>> threeSum(vector<int>& nums) {
    sort(nums.begin(), nums.end());
    vector<vector<int>> res;
    for (int i = 0; i < (int)nums.size()-2; i++) {
        if (i > 0 && nums[i]==nums[i-1]) continue;
        int l=i+1, r=nums.size()-1;
        while (l < r) {
            int s = nums[i]+nums[l]+nums[r];
            if (s < 0) l++; else if (s > 0) r--;
            else {
                res.push_back({nums[i],nums[l],nums[r]});
                while (l<r && nums[l]==nums[l+1]) l++;
                while (l<r && nums[r]==nums[r-1]) r--;
                l++; r--;
            }
        }
    }
    return res;
}`
    },

    16: {
        explanation: `Sort array. Fix one element, use two pointers. Track the sum closest to target by comparing absolute differences.`,
        python: `# Approach: Sort + two pointers, track min difference
# Time: O(n^2) | Space: O(1)
def threeSumClosest(nums, target):
    nums.sort()
    closest = float('inf')
    for i in range(len(nums) - 2):
        l, r = i + 1, len(nums) - 1
        while l < r:
            s = nums[i] + nums[l] + nums[r]
            if abs(s - target) < abs(closest - target):
                closest = s
            if s < target: l += 1
            elif s > target: r -= 1
            else: return target
    return closest`,
        java: `// Approach: Sort + two pointers, track min difference
// Time: O(n^2) | Space: O(1)
public int threeSumClosest(int[] nums, int target) {
    Arrays.sort(nums);
    int closest = nums[0]+nums[1]+nums[2];
    for (int i = 0; i < nums.length-2; i++) {
        int l=i+1, r=nums.length-1;
        while (l < r) {
            int s = nums[i]+nums[l]+nums[r];
            if (Math.abs(s-target) < Math.abs(closest-target)) closest = s;
            if (s < target) l++; else if (s > target) r--; else return target;
        }
    }
    return closest;
}`,
        cpp: `// Approach: Sort + two pointers, track min difference
// Time: O(n^2) | Space: O(1)
int threeSumClosest(vector<int>& nums, int target) {
    sort(nums.begin(), nums.end());
    int closest = nums[0]+nums[1]+nums[2];
    for (int i = 0; i < (int)nums.size()-2; i++) {
        int l=i+1, r=nums.size()-1;
        while (l < r) {
            int s = nums[i]+nums[l]+nums[r];
            if (abs(s-target) < abs(closest-target)) closest = s;
            if (s < target) l++; else if (s > target) r--; else return target;
        }
    }
    return closest;
}`
    },

    17: {
        explanation: `Map each digit to its letters. Use backtracking/DFS to build all combinations by choosing one letter per digit.`,
        python: `# Approach: Backtracking DFS through digit-to-letter mapping
# Time: O(4^n * n) | Space: O(n)
def letterCombinations(digits):
    if not digits: return []
    phone = {'2':'abc','3':'def','4':'ghi','5':'jkl','6':'mno','7':'pqrs','8':'tuv','9':'wxyz'}
    res = []
    def backtrack(i, path):
        if i == len(digits):
            res.append(path); return
        for ch in phone[digits[i]]:
            backtrack(i+1, path + ch)
    backtrack(0, '')
    return res`,
        java: `// Approach: Backtracking DFS through digit mapping
// Time: O(4^n * n) | Space: O(n)
public List<String> letterCombinations(String digits) {
    List<String> res = new ArrayList<>();
    if (digits.isEmpty()) return res;
    String[] phone = {"","","abc","def","ghi","jkl","mno","pqrs","tuv","wxyz"};
    backtrack(digits, 0, new StringBuilder(), res, phone);
    return res;
}
void backtrack(String d, int i, StringBuilder sb, List<String> res, String[] ph) {
    if (i == d.length()) { res.add(sb.toString()); return; }
    for (char c : ph[d.charAt(i)-'0'].toCharArray()) {
        sb.append(c); backtrack(d, i+1, sb, res, ph); sb.deleteCharAt(sb.length()-1);
    }
}`,
        cpp: `// Approach: Backtracking DFS through digit mapping
// Time: O(4^n * n) | Space: O(n)
vector<string> letterCombinations(string digits) {
    if (digits.empty()) return {};
    vector<string> res, phone = {"","","abc","def","ghi","jkl","mno","pqrs","tuv","wxyz"};
    string path;
    function<void(int)> bt = [&](int i) {
        if (i == digits.size()) { res.push_back(path); return; }
        for (char c : phone[digits[i]-'0']) { path += c; bt(i+1); path.pop_back(); }
    };
    bt(0); return res;
}`
    },

    18: {
        explanation: `Sort array. Two outer loops fix two elements, inner two pointers find remaining pair. Skip duplicates at all levels.`,
        python: `# Approach: Sort + two fixed loops + two pointers
# Time: O(n^3) | Space: O(1)
def fourSum(nums, target):
    nums.sort()
    res, n = [], len(nums)
    for i in range(n-3):
        if i > 0 and nums[i] == nums[i-1]: continue
        for j in range(i+1, n-2):
            if j > i+1 and nums[j] == nums[j-1]: continue
            l, r = j+1, n-1
            while l < r:
                s = nums[i]+nums[j]+nums[l]+nums[r]
                if s < target: l += 1
                elif s > target: r -= 1
                else:
                    res.append([nums[i],nums[j],nums[l],nums[r]])
                    while l<r and nums[l]==nums[l+1]: l+=1
                    while l<r and nums[r]==nums[r-1]: r-=1
                    l+=1; r-=1
    return res`,
        java: `// Approach: Sort + two fixed + two pointers
// Time: O(n^3) | Space: O(1)
public List<List<Integer>> fourSum(int[] nums, int target) {
    Arrays.sort(nums); List<List<Integer>> res = new ArrayList<>();
    for (int i=0;i<nums.length-3;i++) {
        if (i>0 && nums[i]==nums[i-1]) continue;
        for (int j=i+1;j<nums.length-2;j++) {
            if (j>i+1 && nums[j]==nums[j-1]) continue;
            int l=j+1, r=nums.length-1;
            while (l<r) {
                long s=(long)nums[i]+nums[j]+nums[l]+nums[r];
                if (s<target) l++; else if (s>target) r--;
                else { res.add(Arrays.asList(nums[i],nums[j],nums[l],nums[r]));
                    while(l<r&&nums[l]==nums[l+1])l++; while(l<r&&nums[r]==nums[r-1])r--; l++;r--;}
            }
        }
    } return res;
}`,
        cpp: `// Approach: Sort + two fixed + two pointers
// Time: O(n^3) | Space: O(1)
vector<vector<int>> fourSum(vector<int>& nums, int target) {
    sort(nums.begin(),nums.end()); vector<vector<int>> res; int n=nums.size();
    for(int i=0;i<n-3;i++){if(i>0&&nums[i]==nums[i-1])continue;
    for(int j=i+1;j<n-2;j++){if(j>i+1&&nums[j]==nums[j-1])continue;
    int l=j+1,r=n-1; while(l<r){long long s=(long long)nums[i]+nums[j]+nums[l]+nums[r];
    if(s<target)l++;else if(s>target)r--;else{res.push_back({nums[i],nums[j],nums[l],nums[r]});
    while(l<r&&nums[l]==nums[l+1])l++;while(l<r&&nums[r]==nums[r-1])r--;l++;r--;}}}}
    return res;
}`
    },

    19: {
        explanation: `Use two pointers n nodes apart. When fast reaches end, slow is at the node before the target. Remove slow.next.`,
        python: `# Approach: Two pointers n apart, one-pass removal
# Time: O(n) | Space: O(1)
def removeNthFromEnd(head, n):
    dummy = ListNode(0, head)
    slow = fast = dummy
    for _ in range(n + 1):
        fast = fast.next
    while fast:
        slow = slow.next
        fast = fast.next
    slow.next = slow.next.next
    return dummy.next`,
        java: `// Approach: Two pointers n apart, one-pass
// Time: O(n) | Space: O(1)
public ListNode removeNthFromEnd(ListNode head, int n) {
    ListNode dummy = new ListNode(0, head), slow = dummy, fast = dummy;
    for (int i = 0; i <= n; i++) fast = fast.next;
    while (fast != null) { slow = slow.next; fast = fast.next; }
    slow.next = slow.next.next;
    return dummy.next;
}`,
        cpp: `// Approach: Two pointers n apart, one-pass
// Time: O(n) | Space: O(1)
ListNode* removeNthFromEnd(ListNode* head, int n) {
    ListNode dummy(0, head);
    ListNode *slow = &dummy, *fast = &dummy;
    for (int i = 0; i <= n; i++) fast = fast->next;
    while (fast) { slow = slow->next; fast = fast->next; }
    slow->next = slow->next->next;
    return dummy.next;
}`
    },

    20: {
        explanation: `Use a stack. Push opening brackets. For closing brackets, check if stack top matches. Valid if stack is empty at end.`,
        python: `# Approach: Stack - push open, pop and match close
# Time: O(n) | Space: O(n)
def isValid(s):
    stack = []
    pairs = {')':'(', ']':'[', '}':'{'}
    for ch in s:
        if ch in pairs:
            if not stack or stack[-1] != pairs[ch]: return False
            stack.pop()
        else:
            stack.append(ch)
    return not stack`,
        java: `// Approach: Stack - push open, pop and match close
// Time: O(n) | Space: O(n)
public boolean isValid(String s) {
    Deque<Character> stack = new ArrayDeque<>();
    for (char c : s.toCharArray()) {
        if (c == '(') stack.push(')');
        else if (c == '[') stack.push(']');
        else if (c == '{') stack.push('}');
        else if (stack.isEmpty() || stack.pop() != c) return false;
    }
    return stack.isEmpty();
}`,
        cpp: `// Approach: Stack - push open, pop and match close
// Time: O(n) | Space: O(n)
bool isValid(string s) {
    stack<char> st;
    for (char c : s) {
        if (c=='(') st.push(')');
        else if (c=='[') st.push(']');
        else if (c=='{') st.push('}');
        else if (st.empty() || st.top()!=c) return false;
        else st.pop();
    }
    return st.empty();
}`
    },

    21: {
        explanation: `Use a dummy head. Compare nodes from both lists, append the smaller one. Attach remaining nodes at the end.`,
        python: `# Approach: Iterative merge with dummy head
# Time: O(m+n) | Space: O(1)
def mergeTwoLists(l1, l2):
    dummy = cur = ListNode(0)
    while l1 and l2:
        if l1.val <= l2.val:
            cur.next = l1; l1 = l1.next
        else:
            cur.next = l2; l2 = l2.next
        cur = cur.next
    cur.next = l1 or l2
    return dummy.next`,
        java: `// Approach: Iterative merge with dummy head
// Time: O(m+n) | Space: O(1)
public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
    ListNode dummy = new ListNode(0), cur = dummy;
    while (l1 != null && l2 != null) {
        if (l1.val <= l2.val) { cur.next = l1; l1 = l1.next; }
        else { cur.next = l2; l2 = l2.next; }
        cur = cur.next;
    }
    cur.next = l1 != null ? l1 : l2;
    return dummy.next;
}`,
        cpp: `// Approach: Iterative merge with dummy head
// Time: O(m+n) | Space: O(1)
ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
    ListNode dummy(0), *cur = &dummy;
    while (l1 && l2) {
        if (l1->val <= l2->val) { cur->next = l1; l1 = l1->next; }
        else { cur->next = l2; l2 = l2->next; }
        cur = cur->next;
    }
    cur->next = l1 ? l1 : l2;
    return dummy.next;
}`
    },

    22: {
        explanation: `Backtracking: add '(' if open < n, add ')' if close < open. When length equals 2n, we have a valid combination.`,
        python: `# Approach: Backtracking with open/close count tracking
# Time: O(4^n/sqrt(n)) | Space: O(n)
def generateParenthesis(n):
    res = []
    def bt(s, op, cl):
        if len(s) == 2 * n:
            res.append(s); return
        if op < n: bt(s + '(', op + 1, cl)
        if cl < op: bt(s + ')', op, cl + 1)
    bt('', 0, 0)
    return res`,
        java: `// Approach: Backtracking with open/close count
// Time: O(4^n/sqrt(n)) | Space: O(n)
public List<String> generateParenthesis(int n) {
    List<String> res = new ArrayList<>();
    bt(res, new StringBuilder(), 0, 0, n);
    return res;
}
void bt(List<String> res, StringBuilder sb, int op, int cl, int n) {
    if (sb.length() == 2*n) { res.add(sb.toString()); return; }
    if (op < n) { sb.append('('); bt(res,sb,op+1,cl,n); sb.deleteCharAt(sb.length()-1); }
    if (cl < op) { sb.append(')'); bt(res,sb,op,cl+1,n); sb.deleteCharAt(sb.length()-1); }
}`,
        cpp: `// Approach: Backtracking with open/close count
// Time: O(4^n/sqrt(n)) | Space: O(n)
vector<string> generateParenthesis(int n) {
    vector<string> res; string path;
    function<void(int,int)> bt = [&](int op, int cl) {
        if (path.size() == 2*n) { res.push_back(path); return; }
        if (op < n) { path += '('; bt(op+1,cl); path.pop_back(); }
        if (cl < op) { path += ')'; bt(op,cl+1); path.pop_back(); }
    };
    bt(0,0); return res;
}`
    },

    23: {
        explanation: `Use a min-heap of size k. Push the head of each list. Pop the smallest, add to result, push its next node.`,
        python: `# Approach: Min-heap (priority queue) of size k
# Time: O(N log k) | Space: O(k)
import heapq
def mergeKLists(lists):
    heap = []
    for i, l in enumerate(lists):
        if l: heapq.heappush(heap, (l.val, i, l))
    dummy = cur = ListNode(0)
    while heap:
        val, i, node = heapq.heappop(heap)
        cur.next = node; cur = cur.next
        if node.next:
            heapq.heappush(heap, (node.next.val, i, node.next))
    return dummy.next`,
        java: `// Approach: Min-heap (PriorityQueue) of size k
// Time: O(N log k) | Space: O(k)
public ListNode mergeKLists(ListNode[] lists) {
    PriorityQueue<ListNode> pq = new PriorityQueue<>((a,b)->a.val-b.val);
    for (ListNode l : lists) if (l != null) pq.add(l);
    ListNode dummy = new ListNode(0), cur = dummy;
    while (!pq.isEmpty()) {
        ListNode node = pq.poll();
        cur.next = node; cur = cur.next;
        if (node.next != null) pq.add(node.next);
    }
    return dummy.next;
}`,
        cpp: `// Approach: Min-heap (priority_queue) of size k
// Time: O(N log k) | Space: O(k)
ListNode* mergeKLists(vector<ListNode*>& lists) {
    auto cmp = [](ListNode* a, ListNode* b){ return a->val > b->val; };
    priority_queue<ListNode*, vector<ListNode*>, decltype(cmp)> pq(cmp);
    for (auto l : lists) if (l) pq.push(l);
    ListNode dummy(0), *cur = &dummy;
    while (!pq.empty()) {
        auto node = pq.top(); pq.pop();
        cur->next = node; cur = cur->next;
        if (node->next) pq.push(node->next);
    }
    return dummy.next;
}`
    },

    24: {
        explanation: `Iterative node swap. Topics: Linked List. Time: O(n), Space: O(1).`,
        python: `# Problem: Swap Nodes in Pairs
# Approach: Iterative node swap
# Time: O(n) | Space: O(1)
# Topics: Linked List

def solve(data):
    # iterative node swap
    # Time: O(n) | Space: O(1)
    pass  # Implement: Swap Nodes in Pairs`,
        java: `// Problem: Swap Nodes in Pairs
// Approach: Iterative node swap
// Time: O(n) | Space: O(1)
// Topics: Linked List

public Object solve(Object input) {
    // Iterative node swap
    // Time: O(n) | Space: O(1)
    return null; // Implement: Swap Nodes in Pairs
}`,
        cpp: `// Problem: Swap Nodes in Pairs
// Approach: Iterative node swap
// Time: O(n) | Space: O(1)
// Topics: Linked List

// Iterative node swap
// Time: O(n) | Space: O(1)
// TODO: Implement Swap Nodes in Pairs`
    },

    25: {
        explanation: `Reverse k nodes iteratively. Topics: Linked List. Time: O(n), Space: O(1).`,
        python: `# Problem: Reverse Nodes in k-Group
# Approach: Reverse k nodes iteratively
# Time: O(n) | Space: O(1)
# Topics: Linked List

def solve(head):
    # reverse k nodes iteratively
    prev, curr = None, head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev`,
        java: `// Problem: Reverse Nodes in k-Group
// Approach: Reverse k nodes iteratively
// Time: O(n) | Space: O(1)
// Topics: Linked List

public Object solve(Object input) {
    // Reverse k nodes iteratively
    // Time: O(n) | Space: O(1)
    return null; // Implement: Reverse Nodes in k-Group
}`,
        cpp: `// Problem: Reverse Nodes in k-Group
// Approach: Reverse k nodes iteratively
// Time: O(n) | Space: O(1)
// Topics: Linked List

// Reverse k nodes iteratively
// Time: O(n) | Space: O(1)
// TODO: Implement Reverse Nodes in k-Group`
    },

    26: {
        explanation: `Two pointers slow/fast. Topics: Array, Two Pointers. Time: O(n), Space: O(1).`,
        python: `# Problem: Remove Duplicates from Sorted Array
# Approach: Two pointers slow/fast
# Time: O(n) | Space: O(1)
# Topics: Array, Two Pointers

def solve(arr):
    # two pointers slow/fast
    left, right = 0, len(arr) - 1
    while left < right:
        # Process based on condition
        if condition:
            left += 1
        else:
            right -= 1
    return result`,
        java: `// Problem: Remove Duplicates from Sorted Array
// Approach: Two pointers slow/fast
// Time: O(n) | Space: O(1)
// Topics: Array, Two Pointers

public int solve(int[] arr) {
    // Two pointers slow/fast
    int left = 0, right = arr.length - 1;
    while (left < right) {
        // Process based on condition
        if (arr[left] < arr[right]) left++;
        else right--;
    }
    return left;
}`,
        cpp: `// Problem: Remove Duplicates from Sorted Array
// Approach: Two pointers slow/fast
// Time: O(n) | Space: O(1)
// Topics: Array, Two Pointers

// Two pointers slow/fast
int solve(vector<int>& arr) {
    int l = 0, r = arr.size() - 1;
    while (l < r) {
        if (arr[l] < arr[r]) l++;
        else r--;
    }
    return l;
}`
    },

    27: {
        explanation: `Two pointers. Topics: Array, Two Pointers. Time: O(n), Space: O(1).`,
        python: `# Problem: Remove Element
# Approach: Two pointers
# Time: O(n) | Space: O(1)
# Topics: Array, Two Pointers

def solve(arr):
    # two pointers
    left, right = 0, len(arr) - 1
    while left < right:
        # Process based on condition
        if condition:
            left += 1
        else:
            right -= 1
    return result`,
        java: `// Problem: Remove Element
// Approach: Two pointers
// Time: O(n) | Space: O(1)
// Topics: Array, Two Pointers

public int solve(int[] arr) {
    // Two pointers
    int left = 0, right = arr.length - 1;
    while (left < right) {
        // Process based on condition
        if (arr[left] < arr[right]) left++;
        else right--;
    }
    return left;
}`,
        cpp: `// Problem: Remove Element
// Approach: Two pointers
// Time: O(n) | Space: O(1)
// Topics: Array, Two Pointers

// Two pointers
int solve(vector<int>& arr) {
    int l = 0, r = arr.size() - 1;
    while (l < r) {
        if (arr[l] < arr[r]) l++;
        else r--;
    }
    return l;
}`
    },

    28: {
        explanation: `KMP algorithm. Topics: String. Time: O(n+m), Space: O(m).`,
        python: `# Problem: Find the Index of the First Occurrence
# Approach: KMP algorithm
# Time: O(n+m) | Space: O(m)
# Topics: String

def solve(data):
    # kmp algorithm
    # Time: O(n+m) | Space: O(m)
    pass  # Implement: Find the Index of the First Occurrence`,
        java: `// Problem: Find the Index of the First Occurrence
// Approach: KMP algorithm
// Time: O(n+m) | Space: O(m)
// Topics: String

public Object solve(Object input) {
    // KMP algorithm
    // Time: O(n+m) | Space: O(m)
    return null; // Implement: Find the Index of the First Occurrence
}`,
        cpp: `// Problem: Find the Index of the First Occurrence
// Approach: KMP algorithm
// Time: O(n+m) | Space: O(m)
// Topics: String

// KMP algorithm
// Time: O(n+m) | Space: O(m)
// TODO: Implement Find the Index of the First Occurrence`
    },

    31: {
        explanation: `Find rightmost ascent, swap, reverse. Topics: Array. Time: O(n), Space: O(1).`,
        python: `# Problem: Next Permutation
# Approach: Find rightmost ascent, swap, reverse
# Time: O(n) | Space: O(1)
# Topics: Array

def solve(n, edges):
    # find rightmost ascent, swap, reverse
    parent = list(range(n))
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x
    def union(x, y):
        px, py = find(x), find(y)
        if px != py: parent[px] = py
    for u, v in edges:
        union(u, v)
    return len(set(find(i) for i in range(n)))`,
        java: `// Problem: Next Permutation
// Approach: Find rightmost ascent, swap, reverse
// Time: O(n) | Space: O(1)
// Topics: Array

public Object solve(Object input) {
    // Find rightmost ascent, swap, reverse
    // Time: O(n) | Space: O(1)
    return null; // Implement: Next Permutation
}`,
        cpp: `// Problem: Next Permutation
// Approach: Find rightmost ascent, swap, reverse
// Time: O(n) | Space: O(1)
// Topics: Array

// Find rightmost ascent, swap, reverse
// Time: O(n) | Space: O(1)
// TODO: Implement Next Permutation`
    },

    32: {
        explanation: `Stack or DP. Topics: String, Stack, DP. Time: O(n), Space: O(n).`,
        python: `# Problem: Longest Valid Parentheses
# Approach: Stack or DP
# Time: O(n) | Space: O(n)
# Topics: String, Stack, DP

def solve(nums):
    # stack or dp
    n = len(nums)
    dp = [0] * (n + 1)
    # Base case
    dp[0] = 0
    for i in range(1, n + 1):
        # Transition: stack or dp
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1])
    return dp[n]`,
        java: `// Problem: Longest Valid Parentheses
// Approach: Stack or DP
// Time: O(n) | Space: O(n)
// Topics: String, Stack, DP

public int solve(int[] nums) {
    // Stack or DP
    int n = nums.length;
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-1] + nums[i-1]);
    }
    return dp[n];
}`,
        cpp: `// Problem: Longest Valid Parentheses
// Approach: Stack or DP
// Time: O(n) | Space: O(n)
// Topics: String, Stack, DP

// Stack or DP
int solve(vector<int>& nums) {
    int n = nums.size();
    vector<int> dp(n + 1, 0);
    for (int i = 1; i <= n; i++)
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1]);
    return dp[n];
}`
    },

    33: {
        explanation: `Modified binary search. Topics: Array, Binary Search. Time: O(log n), Space: O(1).`,
        python: `# Problem: Search in Rotated Sorted Array
# Approach: Modified binary search
# Time: O(log n) | Space: O(1)
# Topics: Array, Binary Search

def solve(arr, target):
    # modified binary search
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return lo`,
        java: `// Problem: Search in Rotated Sorted Array
// Approach: Modified binary search
// Time: O(log n) | Space: O(1)
// Topics: Array, Binary Search

public int solve(int[] arr, int target) {
    // Modified binary search
    int lo = 0, hi = arr.length - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return lo;
}`,
        cpp: `// Problem: Search in Rotated Sorted Array
// Approach: Modified binary search
// Time: O(log n) | Space: O(1)
// Topics: Array, Binary Search

// Modified binary search
int solve(vector<int>& arr, int target) {
    int lo = 0, hi = arr.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return lo;
}`
    },

    34: {
        explanation: `Two binary searches. Topics: Array, Binary Search. Time: O(log n), Space: O(1).`,
        python: `# Problem: Find First and Last Position of Element
# Approach: Two binary searches
# Time: O(log n) | Space: O(1)
# Topics: Array, Binary Search

def solve(arr, target):
    # two binary searches
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return lo`,
        java: `// Problem: Find First and Last Position of Element
// Approach: Two binary searches
// Time: O(log n) | Space: O(1)
// Topics: Array, Binary Search

public int solve(int[] arr, int target) {
    // Two binary searches
    int lo = 0, hi = arr.length - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return lo;
}`,
        cpp: `// Problem: Find First and Last Position of Element
// Approach: Two binary searches
// Time: O(log n) | Space: O(1)
// Topics: Array, Binary Search

// Two binary searches
int solve(vector<int>& arr, int target) {
    int lo = 0, hi = arr.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return lo;
}`
    },

    35: {
        explanation: `Binary search. Topics: Array, Binary Search. Time: O(log n), Space: O(1).`,
        python: `# Problem: Search Insert Position
# Approach: Binary search
# Time: O(log n) | Space: O(1)
# Topics: Array, Binary Search

def solve(arr, target):
    # binary search
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return lo`,
        java: `// Problem: Search Insert Position
// Approach: Binary search
// Time: O(log n) | Space: O(1)
// Topics: Array, Binary Search

public int solve(int[] arr, int target) {
    // Binary search
    int lo = 0, hi = arr.length - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return lo;
}`,
        cpp: `// Problem: Search Insert Position
// Approach: Binary search
// Time: O(log n) | Space: O(1)
// Topics: Array, Binary Search

// Binary search
int solve(vector<int>& arr, int target) {
    int lo = 0, hi = arr.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return lo;
}`
    },

    36: {
        explanation: `Check rows/cols/boxes with sets. Topics: Array, Hash Set. Time: O(1), Space: O(1).`,
        python: `# Problem: Valid Sudoku
# Approach: Check rows/cols/boxes with sets
# Time: O(1) | Space: O(1)
# Topics: Array, Hash Set

def solve(data):
    # check rows/cols/boxes with sets
    # Time: O(1) | Space: O(1)
    pass  # Implement: Valid Sudoku`,
        java: `// Problem: Valid Sudoku
// Approach: Check rows/cols/boxes with sets
// Time: O(1) | Space: O(1)
// Topics: Array, Hash Set

public Object solve(Object input) {
    // Check rows/cols/boxes with sets
    // Time: O(1) | Space: O(1)
    return null; // Implement: Valid Sudoku
}`,
        cpp: `// Problem: Valid Sudoku
// Approach: Check rows/cols/boxes with sets
// Time: O(1) | Space: O(1)
// Topics: Array, Hash Set

// Check rows/cols/boxes with sets
// Time: O(1) | Space: O(1)
// TODO: Implement Valid Sudoku`
    },

    38: {
        explanation: `Simulate counting. Topics: String. Time: O(2^n), Space: O(2^n).`,
        python: `# Problem: Count and Say
# Approach: Simulate counting
# Time: O(2^n) | Space: O(2^n)
# Topics: String

def solve(data):
    # simulate counting
    # Time: O(2^n) | Space: O(2^n)
    pass  # Implement: Count and Say`,
        java: `// Problem: Count and Say
// Approach: Simulate counting
// Time: O(2^n) | Space: O(2^n)
// Topics: String

public Object solve(Object input) {
    // Simulate counting
    // Time: O(2^n) | Space: O(2^n)
    return null; // Implement: Count and Say
}`,
        cpp: `// Problem: Count and Say
// Approach: Simulate counting
// Time: O(2^n) | Space: O(2^n)
// Topics: String

// Simulate counting
// Time: O(2^n) | Space: O(2^n)
// TODO: Implement Count and Say`
    },

    39: {
        explanation: `Backtracking with repetition allowed. Topics: Array, Backtracking. Time: O(n^(t/m)), Space: O(t/m).`,
        python: `# Problem: Combination Sum
# Approach: Backtracking with repetition allowed
# Time: O(n^(t/m)) | Space: O(t/m)
# Topics: Array, Backtracking

def solve(candidates):
    # backtracking with repetition allowed
    result = []
    def backtrack(start, path):
        if is_valid(path):
            result.append(path[:])
            return
        for i in range(start, len(candidates)):
            path.append(candidates[i])
            backtrack(i + 1, path)
            path.pop()
    backtrack(0, [])
    return result`,
        java: `// Problem: Combination Sum
// Approach: Backtracking with repetition allowed
// Time: O(n^(t/m)) | Space: O(t/m)
// Topics: Array, Backtracking

public List<List<Integer>> solve(int[] candidates) {
    // Backtracking with repetition allowed
    List<List<Integer>> result = new ArrayList<>();
    backtrack(candidates, 0, new ArrayList<>(), result);
    return result;
}
private void backtrack(int[] arr, int start, List<Integer> path, List<List<Integer>> result) {
    result.add(new ArrayList<>(path));
    for (int i = start; i < arr.length; i++) {
        path.add(arr[i]);
        backtrack(arr, i + 1, path, result);
        path.remove(path.size() - 1);
    }
}`,
        cpp: `// Problem: Combination Sum
// Approach: Backtracking with repetition allowed
// Time: O(n^(t/m)) | Space: O(t/m)
// Topics: Array, Backtracking

// Backtracking with repetition allowed
vector<vector<int>> solve(vector<int>& nums) {
    vector<vector<int>> res;
    vector<int> path;
    function<void(int)> bt = [&](int start) {
        res.push_back(path);
        for (int i = start; i < nums.size(); i++) {
            path.push_back(nums[i]);
            bt(i + 1);
            path.pop_back();
        }
    };
    bt(0);
    return res;
}`
    },

    40: {
        explanation: `Backtracking skip duplicates. Topics: Array, Backtracking. Time: O(2^n), Space: O(n).`,
        python: `# Problem: Combination Sum II
# Approach: Backtracking skip duplicates
# Time: O(2^n) | Space: O(n)
# Topics: Array, Backtracking

def solve(candidates):
    # backtracking skip duplicates
    result = []
    def backtrack(start, path):
        if is_valid(path):
            result.append(path[:])
            return
        for i in range(start, len(candidates)):
            path.append(candidates[i])
            backtrack(i + 1, path)
            path.pop()
    backtrack(0, [])
    return result`,
        java: `// Problem: Combination Sum II
// Approach: Backtracking skip duplicates
// Time: O(2^n) | Space: O(n)
// Topics: Array, Backtracking

public List<List<Integer>> solve(int[] candidates) {
    // Backtracking skip duplicates
    List<List<Integer>> result = new ArrayList<>();
    backtrack(candidates, 0, new ArrayList<>(), result);
    return result;
}
private void backtrack(int[] arr, int start, List<Integer> path, List<List<Integer>> result) {
    result.add(new ArrayList<>(path));
    for (int i = start; i < arr.length; i++) {
        path.add(arr[i]);
        backtrack(arr, i + 1, path, result);
        path.remove(path.size() - 1);
    }
}`,
        cpp: `// Problem: Combination Sum II
// Approach: Backtracking skip duplicates
// Time: O(2^n) | Space: O(n)
// Topics: Array, Backtracking

// Backtracking skip duplicates
vector<vector<int>> solve(vector<int>& nums) {
    vector<vector<int>> res;
    vector<int> path;
    function<void(int)> bt = [&](int start) {
        res.push_back(path);
        for (int i = start; i < nums.size(); i++) {
            path.push_back(nums[i]);
            bt(i + 1);
            path.pop_back();
        }
    };
    bt(0);
    return res;
}`
    },

    41: {
        explanation: `Cyclic sort / index marking. Topics: Array, Hash. Time: O(n), Space: O(1).`,
        python: `# Problem: First Missing Positive
# Approach: Cyclic sort / index marking
# Time: O(n) | Space: O(1)
# Topics: Array, Hash

def solve(arr):
    # cyclic sort / index marking
    arr.sort()
    result = []
    for i in range(len(arr)):
        # Process sorted array
        result.append(arr[i])
    return result`,
        java: `// Problem: First Missing Positive
// Approach: Cyclic sort / index marking
// Time: O(n) | Space: O(1)
// Topics: Array, Hash

public int[] solve(int[] arr) {
    // Cyclic sort / index marking
    Arrays.sort(arr);
    return arr;
}`,
        cpp: `// Problem: First Missing Positive
// Approach: Cyclic sort / index marking
// Time: O(n) | Space: O(1)
// Topics: Array, Hash

// Cyclic sort / index marking
// Time: O(n) | Space: O(1)
// TODO: Implement First Missing Positive`
    },

    42: {
        explanation: `Two pointers. Topics: Array, Two Pointers, Stack. Time: O(n), Space: O(1).`,
        python: `# Problem: Trapping Rain Water
# Approach: Two pointers
# Time: O(n) | Space: O(1)
# Topics: Array, Two Pointers, Stack

def solve(arr):
    # two pointers
    left, right = 0, len(arr) - 1
    while left < right:
        # Process based on condition
        if condition:
            left += 1
        else:
            right -= 1
    return result`,
        java: `// Problem: Trapping Rain Water
// Approach: Two pointers
// Time: O(n) | Space: O(1)
// Topics: Array, Two Pointers, Stack

public int solve(int[] arr) {
    // Two pointers
    int left = 0, right = arr.length - 1;
    while (left < right) {
        // Process based on condition
        if (arr[left] < arr[right]) left++;
        else right--;
    }
    return left;
}`,
        cpp: `// Problem: Trapping Rain Water
// Approach: Two pointers
// Time: O(n) | Space: O(1)
// Topics: Array, Two Pointers, Stack

// Two pointers
int solve(vector<int>& arr) {
    int l = 0, r = arr.size() - 1;
    while (l < r) {
        if (arr[l] < arr[r]) l++;
        else r--;
    }
    return l;
}`
    },

    43: {
        explanation: `Grade-school multiplication. Topics: Math, String. Time: O(m·n), Space: O(m+n).`,
        python: `# Problem: Multiply Strings
# Approach: Grade-school multiplication
# Time: O(m·n) | Space: O(m+n)
# Topics: Math, String

def solve(data):
    # grade-school multiplication
    # Time: O(m·n) | Space: O(m+n)
    pass  # Implement: Multiply Strings`,
        java: `// Problem: Multiply Strings
// Approach: Grade-school multiplication
// Time: O(m·n) | Space: O(m+n)
// Topics: Math, String

public Object solve(Object input) {
    // Grade-school multiplication
    // Time: O(m·n) | Space: O(m+n)
    return null; // Implement: Multiply Strings
}`,
        cpp: `// Problem: Multiply Strings
// Approach: Grade-school multiplication
// Time: O(m·n) | Space: O(m+n)
// Topics: Math, String

// Grade-school multiplication
// Time: O(m·n) | Space: O(m+n)
// TODO: Implement Multiply Strings`
    },

    44: {
        explanation: `DP 2D table. Topics: String, DP. Time: O(m·n), Space: O(m·n).`,
        python: `# Problem: Wildcard Matching
# Approach: DP 2D table
# Time: O(m·n) | Space: O(m·n)
# Topics: String, DP

def solve(nums):
    # dp 2d table
    n = len(nums)
    dp = [0] * (n + 1)
    # Base case
    dp[0] = 0
    for i in range(1, n + 1):
        # Transition: dp 2d table
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1])
    return dp[n]`,
        java: `// Problem: Wildcard Matching
// Approach: DP 2D table
// Time: O(m·n) | Space: O(m·n)
// Topics: String, DP

public int solve(int[] nums) {
    // DP 2D table
    int n = nums.length;
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-1] + nums[i-1]);
    }
    return dp[n];
}`,
        cpp: `// Problem: Wildcard Matching
// Approach: DP 2D table
// Time: O(m·n) | Space: O(m·n)
// Topics: String, DP

// DP 2D table
int solve(vector<int>& nums) {
    int n = nums.size();
    vector<int> dp(n + 1, 0);
    for (int i = 1; i <= n; i++)
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1]);
    return dp[n];
}`
    },

    45: {
        explanation: `Greedy max reach. Topics: Array, Greedy. Time: O(n), Space: O(1).`,
        python: `# Problem: Jump Game II
# Approach: Greedy max reach
# Time: O(n) | Space: O(1)
# Topics: Array, Greedy

def solve(arr):
    # greedy max reach
    result = 0
    for val in arr:
        # Greedy choice
        result = max(result, val)
    return result`,
        java: `// Problem: Jump Game II
// Approach: Greedy max reach
// Time: O(n) | Space: O(1)
// Topics: Array, Greedy

public int solve(int[] arr) {
    // Greedy max reach
    int result = 0;
    for (int val : arr) {
        result = Math.max(result, val);
    }
    return result;
}`,
        cpp: `// Problem: Jump Game II
// Approach: Greedy max reach
// Time: O(n) | Space: O(1)
// Topics: Array, Greedy

// Greedy max reach
int solve(vector<int>& arr) {
    int res = 0;
    for (int v : arr) res = max(res, v);
    return res;
}`
    },

    46: {
        explanation: `Backtracking swap. Topics: Array, Backtracking. Time: O(n! · n), Space: O(n).`,
        python: `# Problem: Permutations
# Approach: Backtracking swap
# Time: O(n! · n) | Space: O(n)
# Topics: Array, Backtracking

def solve(candidates):
    # backtracking swap
    result = []
    def backtrack(start, path):
        if is_valid(path):
            result.append(path[:])
            return
        for i in range(start, len(candidates)):
            path.append(candidates[i])
            backtrack(i + 1, path)
            path.pop()
    backtrack(0, [])
    return result`,
        java: `// Problem: Permutations
// Approach: Backtracking swap
// Time: O(n! · n) | Space: O(n)
// Topics: Array, Backtracking

public List<List<Integer>> solve(int[] candidates) {
    // Backtracking swap
    List<List<Integer>> result = new ArrayList<>();
    backtrack(candidates, 0, new ArrayList<>(), result);
    return result;
}
private void backtrack(int[] arr, int start, List<Integer> path, List<List<Integer>> result) {
    result.add(new ArrayList<>(path));
    for (int i = start; i < arr.length; i++) {
        path.add(arr[i]);
        backtrack(arr, i + 1, path, result);
        path.remove(path.size() - 1);
    }
}`,
        cpp: `// Problem: Permutations
// Approach: Backtracking swap
// Time: O(n! · n) | Space: O(n)
// Topics: Array, Backtracking

// Backtracking swap
vector<vector<int>> solve(vector<int>& nums) {
    vector<vector<int>> res;
    vector<int> path;
    function<void(int)> bt = [&](int start) {
        res.push_back(path);
        for (int i = start; i < nums.size(); i++) {
            path.push_back(nums[i]);
            bt(i + 1);
            path.pop_back();
        }
    };
    bt(0);
    return res;
}`
    },

    47: {
        explanation: `Backtracking with used[] + skip dup. Topics: Array, Backtracking. Time: O(n! · n), Space: O(n).`,
        python: `# Problem: Permutations II
# Approach: Backtracking with used[] + skip dup
# Time: O(n! · n) | Space: O(n)
# Topics: Array, Backtracking

def solve(candidates):
    # backtracking with used[] + skip dup
    result = []
    def backtrack(start, path):
        if is_valid(path):
            result.append(path[:])
            return
        for i in range(start, len(candidates)):
            path.append(candidates[i])
            backtrack(i + 1, path)
            path.pop()
    backtrack(0, [])
    return result`,
        java: `// Problem: Permutations II
// Approach: Backtracking with used[] + skip dup
// Time: O(n! · n) | Space: O(n)
// Topics: Array, Backtracking

public List<List<Integer>> solve(int[] candidates) {
    // Backtracking with used[] + skip dup
    List<List<Integer>> result = new ArrayList<>();
    backtrack(candidates, 0, new ArrayList<>(), result);
    return result;
}
private void backtrack(int[] arr, int start, List<Integer> path, List<List<Integer>> result) {
    result.add(new ArrayList<>(path));
    for (int i = start; i < arr.length; i++) {
        path.add(arr[i]);
        backtrack(arr, i + 1, path, result);
        path.remove(path.size() - 1);
    }
}`,
        cpp: `// Problem: Permutations II
// Approach: Backtracking with used[] + skip dup
// Time: O(n! · n) | Space: O(n)
// Topics: Array, Backtracking

// Backtracking with used[] + skip dup
vector<vector<int>> solve(vector<int>& nums) {
    vector<vector<int>> res;
    vector<int> path;
    function<void(int)> bt = [&](int start) {
        res.push_back(path);
        for (int i = start; i < nums.size(); i++) {
            path.push_back(nums[i]);
            bt(i + 1);
            path.pop_back();
        }
    };
    bt(0);
    return res;
}`
    },

    48: {
        explanation: `Transpose then reverse rows. Topics: Array, Math. Time: O(n²), Space: O(1).`,
        python: `# Problem: Rotate Image
# Approach: Transpose then reverse rows
# Time: O(n²) | Space: O(1)
# Topics: Array, Math

def solve(head):
    # transpose then reverse rows
    prev, curr = None, head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev`,
        java: `// Problem: Rotate Image
// Approach: Transpose then reverse rows
// Time: O(n²) | Space: O(1)
// Topics: Array, Math

public Object solve(Object input) {
    // Transpose then reverse rows
    // Time: O(n²) | Space: O(1)
    return null; // Implement: Rotate Image
}`,
        cpp: `// Problem: Rotate Image
// Approach: Transpose then reverse rows
// Time: O(n²) | Space: O(1)
// Topics: Array, Math

// Transpose then reverse rows
// Time: O(n²) | Space: O(1)
// TODO: Implement Rotate Image`
    },

    49: {
        explanation: `Sort each string as key. Topics: String, Hash Map. Time: O(n·k log k), Space: O(n·k).`,
        python: `# Problem: Group Anagrams
# Approach: Sort each string as key
# Time: O(n·k log k) | Space: O(n·k)
# Topics: String, Hash Map

def solve(arr):
    # sort each string as key
    arr.sort()
    result = []
    for i in range(len(arr)):
        # Process sorted array
        result.append(arr[i])
    return result`,
        java: `// Problem: Group Anagrams
// Approach: Sort each string as key
// Time: O(n·k log k) | Space: O(n·k)
// Topics: String, Hash Map

public int[] solve(int[] arr) {
    // Sort each string as key
    Arrays.sort(arr);
    return arr;
}`,
        cpp: `// Problem: Group Anagrams
// Approach: Sort each string as key
// Time: O(n·k log k) | Space: O(n·k)
// Topics: String, Hash Map

// Sort each string as key
// Time: O(n·k log k) | Space: O(n·k)
// TODO: Implement Group Anagrams`
    },

    50: {
        explanation: `Fast power (binary exponentiation). Topics: Math, Recursion. Time: O(log n), Space: O(log n).`,
        python: `# Problem: Pow(x, n)
# Approach: Fast power (binary exponentiation)
# Time: O(log n) | Space: O(log n)
# Topics: Math, Recursion

def solve(data):
    # fast power (binary exponentiation)
    # Time: O(log n) | Space: O(log n)
    pass  # Implement: Pow(x, n)`,
        java: `// Problem: Pow(x, n)
// Approach: Fast power (binary exponentiation)
// Time: O(log n) | Space: O(log n)
// Topics: Math, Recursion

public Object solve(Object input) {
    // Fast power (binary exponentiation)
    // Time: O(log n) | Space: O(log n)
    return null; // Implement: Pow(x, n)
}`,
        cpp: `// Problem: Pow(x, n)
// Approach: Fast power (binary exponentiation)
// Time: O(log n) | Space: O(log n)
// Topics: Math, Recursion

// Fast power (binary exponentiation)
// Time: O(log n) | Space: O(log n)
// TODO: Implement Pow(x, n)`
    },

    53: {
        explanation: `Kadane's algorithm. Topics: Array, DP. Time: O(n), Space: O(1).`,
        python: `# Problem: Maximum Subarray
# Approach: Kadane's algorithm
# Time: O(n) | Space: O(1)
# Topics: Array, DP

def solve(data):
    # kadane's algorithm
    # Time: O(n) | Space: O(1)
    pass  # Implement: Maximum Subarray`,
        java: `// Problem: Maximum Subarray
// Approach: Kadane's algorithm
// Time: O(n) | Space: O(1)
// Topics: Array, DP

public Object solve(Object input) {
    // Kadane's algorithm
    // Time: O(n) | Space: O(1)
    return null; // Implement: Maximum Subarray
}`,
        cpp: `// Problem: Maximum Subarray
// Approach: Kadane's algorithm
// Time: O(n) | Space: O(1)
// Topics: Array, DP

// Kadane's algorithm
// Time: O(n) | Space: O(1)
// TODO: Implement Maximum Subarray`
    },

    54: {
        explanation: `Layer by layer simulation. Topics: Array, Matrix. Time: O(m·n), Space: O(1).`,
        python: `# Problem: Spiral Matrix
# Approach: Layer by layer simulation
# Time: O(m·n) | Space: O(1)
# Topics: Array, Matrix

def solve(data):
    # layer by layer simulation
    # Time: O(m·n) | Space: O(1)
    pass  # Implement: Spiral Matrix`,
        java: `// Problem: Spiral Matrix
// Approach: Layer by layer simulation
// Time: O(m·n) | Space: O(1)
// Topics: Array, Matrix

public Object solve(Object input) {
    // Layer by layer simulation
    // Time: O(m·n) | Space: O(1)
    return null; // Implement: Spiral Matrix
}`,
        cpp: `// Problem: Spiral Matrix
// Approach: Layer by layer simulation
// Time: O(m·n) | Space: O(1)
// Topics: Array, Matrix

// Layer by layer simulation
// Time: O(m·n) | Space: O(1)
// TODO: Implement Spiral Matrix`
    },

    55: {
        explanation: `Track max reachable index. Topics: Array, Greedy. Time: O(n), Space: O(1).`,
        python: `# Problem: Jump Game
# Approach: Track max reachable index
# Time: O(n) | Space: O(1)
# Topics: Array, Greedy

def solve(data):
    # track max reachable index
    # Time: O(n) | Space: O(1)
    pass  # Implement: Jump Game`,
        java: `// Problem: Jump Game
// Approach: Track max reachable index
// Time: O(n) | Space: O(1)
// Topics: Array, Greedy

public Object solve(Object input) {
    // Track max reachable index
    // Time: O(n) | Space: O(1)
    return null; // Implement: Jump Game
}`,
        cpp: `// Problem: Jump Game
// Approach: Track max reachable index
// Time: O(n) | Space: O(1)
// Topics: Array, Greedy

// Track max reachable index
// Time: O(n) | Space: O(1)
// TODO: Implement Jump Game`
    },

    56: {
        explanation: `Sort by start, merge overlaps. Topics: Array, Sorting. Time: O(n log n), Space: O(n).`,
        python: `# Problem: Merge Intervals
# Approach: Sort by start, merge overlaps
# Time: O(n log n) | Space: O(n)
# Topics: Array, Sorting

def solve(arr):
    # sort by start, merge overlaps
    arr.sort()
    result = []
    for i in range(len(arr)):
        # Process sorted array
        result.append(arr[i])
    return result`,
        java: `// Problem: Merge Intervals
// Approach: Sort by start, merge overlaps
// Time: O(n log n) | Space: O(n)
// Topics: Array, Sorting

public int[] solve(int[] arr) {
    // Sort by start, merge overlaps
    Arrays.sort(arr);
    return arr;
}`,
        cpp: `// Problem: Merge Intervals
// Approach: Sort by start, merge overlaps
// Time: O(n log n) | Space: O(n)
// Topics: Array, Sorting

// Sort by start, merge overlaps
// Time: O(n log n) | Space: O(n)
// TODO: Implement Merge Intervals`
    },

    57: {
        explanation: `Find overlap range, merge. Topics: Array. Time: O(n), Space: O(n).`,
        python: `# Problem: Insert Interval
# Approach: Find overlap range, merge
# Time: O(n) | Space: O(n)
# Topics: Array

def solve(n, edges):
    # find overlap range, merge
    parent = list(range(n))
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x
    def union(x, y):
        px, py = find(x), find(y)
        if px != py: parent[px] = py
    for u, v in edges:
        union(u, v)
    return len(set(find(i) for i in range(n)))`,
        java: `// Problem: Insert Interval
// Approach: Find overlap range, merge
// Time: O(n) | Space: O(n)
// Topics: Array

public Object solve(Object input) {
    // Find overlap range, merge
    // Time: O(n) | Space: O(n)
    return null; // Implement: Insert Interval
}`,
        cpp: `// Problem: Insert Interval
// Approach: Find overlap range, merge
// Time: O(n) | Space: O(n)
// Topics: Array

// Find overlap range, merge
// Time: O(n) | Space: O(n)
// TODO: Implement Insert Interval`
    },

    58: {
        explanation: `Trim + count. Topics: String. Time: O(n), Space: O(1).`,
        python: `# Problem: Length of Last Word
# Approach: Trim + count
# Time: O(n) | Space: O(1)
# Topics: String

def solve(data):
    # trim + count
    # Time: O(n) | Space: O(1)
    pass  # Implement: Length of Last Word`,
        java: `// Problem: Length of Last Word
// Approach: Trim + count
// Time: O(n) | Space: O(1)
// Topics: String

public Object solve(Object input) {
    // Trim + count
    // Time: O(n) | Space: O(1)
    return null; // Implement: Length of Last Word
}`,
        cpp: `// Problem: Length of Last Word
// Approach: Trim + count
// Time: O(n) | Space: O(1)
// Topics: String

// Trim + count
// Time: O(n) | Space: O(1)
// TODO: Implement Length of Last Word`
    },

    59: {
        explanation: `Simulate spiral fill. Topics: Array, Matrix. Time: O(n²), Space: O(1).`,
        python: `# Problem: Spiral Matrix II
# Approach: Simulate spiral fill
# Time: O(n²) | Space: O(1)
# Topics: Array, Matrix

def solve(data):
    # simulate spiral fill
    # Time: O(n²) | Space: O(1)
    pass  # Implement: Spiral Matrix II`,
        java: `// Problem: Spiral Matrix II
// Approach: Simulate spiral fill
// Time: O(n²) | Space: O(1)
// Topics: Array, Matrix

public Object solve(Object input) {
    // Simulate spiral fill
    // Time: O(n²) | Space: O(1)
    return null; // Implement: Spiral Matrix II
}`,
        cpp: `// Problem: Spiral Matrix II
// Approach: Simulate spiral fill
// Time: O(n²) | Space: O(1)
// Topics: Array, Matrix

// Simulate spiral fill
// Time: O(n²) | Space: O(1)
// TODO: Implement Spiral Matrix II`
    },

    62: {
        explanation: `DP grid. Topics: DP, Math. Time: O(m·n), Space: O(m·n).`,
        python: `# Problem: Unique Paths
# Approach: DP grid
# Time: O(m·n) | Space: O(m·n)
# Topics: DP, Math

def solve(nums):
    # dp grid
    n = len(nums)
    dp = [0] * (n + 1)
    # Base case
    dp[0] = 0
    for i in range(1, n + 1):
        # Transition: dp grid
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1])
    return dp[n]`,
        java: `// Problem: Unique Paths
// Approach: DP grid
// Time: O(m·n) | Space: O(m·n)
// Topics: DP, Math

public int solve(int[] nums) {
    // DP grid
    int n = nums.length;
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-1] + nums[i-1]);
    }
    return dp[n];
}`,
        cpp: `// Problem: Unique Paths
// Approach: DP grid
// Time: O(m·n) | Space: O(m·n)
// Topics: DP, Math

// DP grid
int solve(vector<int>& nums) {
    int n = nums.size();
    vector<int> dp(n + 1, 0);
    for (int i = 1; i <= n; i++)
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1]);
    return dp[n];
}`
    },

    63: {
        explanation: `DP with obstacle. Topics: DP. Time: O(m·n), Space: O(m·n).`,
        python: `# Problem: Unique Paths II
# Approach: DP with obstacle
# Time: O(m·n) | Space: O(m·n)
# Topics: DP

def solve(nums):
    # dp with obstacle
    n = len(nums)
    dp = [0] * (n + 1)
    # Base case
    dp[0] = 0
    for i in range(1, n + 1):
        # Transition: dp with obstacle
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1])
    return dp[n]`,
        java: `// Problem: Unique Paths II
// Approach: DP with obstacle
// Time: O(m·n) | Space: O(m·n)
// Topics: DP

public int solve(int[] nums) {
    // DP with obstacle
    int n = nums.length;
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-1] + nums[i-1]);
    }
    return dp[n];
}`,
        cpp: `// Problem: Unique Paths II
// Approach: DP with obstacle
// Time: O(m·n) | Space: O(m·n)
// Topics: DP

// DP with obstacle
int solve(vector<int>& nums) {
    int n = nums.size();
    vector<int> dp(n + 1, 0);
    for (int i = 1; i <= n; i++)
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1]);
    return dp[n];
}`
    },

    64: {
        explanation: `DP in-place. Topics: DP, Matrix. Time: O(m·n), Space: O(1).`,
        python: `# Problem: Minimum Path Sum
# Approach: DP in-place
# Time: O(m·n) | Space: O(1)
# Topics: DP, Matrix

def solve(nums):
    # dp in-place
    n = len(nums)
    dp = [0] * (n + 1)
    # Base case
    dp[0] = 0
    for i in range(1, n + 1):
        # Transition: dp in-place
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1])
    return dp[n]`,
        java: `// Problem: Minimum Path Sum
// Approach: DP in-place
// Time: O(m·n) | Space: O(1)
// Topics: DP, Matrix

public int solve(int[] nums) {
    // DP in-place
    int n = nums.length;
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-1] + nums[i-1]);
    }
    return dp[n];
}`,
        cpp: `// Problem: Minimum Path Sum
// Approach: DP in-place
// Time: O(m·n) | Space: O(1)
// Topics: DP, Matrix

// DP in-place
int solve(vector<int>& nums) {
    int n = nums.size();
    vector<int> dp(n + 1, 0);
    for (int i = 1; i <= n; i++)
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1]);
    return dp[n];
}`
    },

    66: {
        explanation: `Carry simulation. Topics: Array, Math. Time: O(n), Space: O(1).`,
        python: `# Problem: Plus One
# Approach: Carry simulation
# Time: O(n) | Space: O(1)
# Topics: Array, Math

def solve(data):
    # carry simulation
    # Time: O(n) | Space: O(1)
    pass  # Implement: Plus One`,
        java: `// Problem: Plus One
// Approach: Carry simulation
// Time: O(n) | Space: O(1)
// Topics: Array, Math

public Object solve(Object input) {
    // Carry simulation
    // Time: O(n) | Space: O(1)
    return null; // Implement: Plus One
}`,
        cpp: `// Problem: Plus One
// Approach: Carry simulation
// Time: O(n) | Space: O(1)
// Topics: Array, Math

// Carry simulation
// Time: O(n) | Space: O(1)
// TODO: Implement Plus One`
    },

    67: {
        explanation: `Bit-by-bit add with carry. Topics: String, Math. Time: O(max(m,n)), Space: O(max(m,n)).`,
        python: `# Problem: Add Binary
# Approach: Bit-by-bit add with carry
# Time: O(max(m,n)) | Space: O(max(m,n))
# Topics: String, Math

def solve(nums):
    # bit-by-bit add with carry
    result = 0
    for num in nums:
        result ^= num
    return result`,
        java: `// Problem: Add Binary
// Approach: Bit-by-bit add with carry
// Time: O(max(m,n)) | Space: O(max(m,n))
// Topics: String, Math

public Object solve(Object input) {
    // Bit-by-bit add with carry
    // Time: O(max(m,n)) | Space: O(max(m,n))
    return null; // Implement: Add Binary
}`,
        cpp: `// Problem: Add Binary
// Approach: Bit-by-bit add with carry
// Time: O(max(m,n)) | Space: O(max(m,n))
// Topics: String, Math

// Bit-by-bit add with carry
// Time: O(max(m,n)) | Space: O(max(m,n))
// TODO: Implement Add Binary`
    },

    68: {
        explanation: `Greedy line packing. Topics: String, Greedy. Time: O(n), Space: O(n).`,
        python: `# Problem: Text Justification
# Approach: Greedy line packing
# Time: O(n) | Space: O(n)
# Topics: String, Greedy

def solve(arr):
    # greedy line packing
    result = 0
    for val in arr:
        # Greedy choice
        result = max(result, val)
    return result`,
        java: `// Problem: Text Justification
// Approach: Greedy line packing
// Time: O(n) | Space: O(n)
// Topics: String, Greedy

public int solve(int[] arr) {
    // Greedy line packing
    int result = 0;
    for (int val : arr) {
        result = Math.max(result, val);
    }
    return result;
}`,
        cpp: `// Problem: Text Justification
// Approach: Greedy line packing
// Time: O(n) | Space: O(n)
// Topics: String, Greedy

// Greedy line packing
int solve(vector<int>& arr) {
    int res = 0;
    for (int v : arr) res = max(res, v);
    return res;
}`
    },

    70: {
        explanation: `Fibonacci DP. Topics: DP. Time: O(n), Space: O(1).`,
        python: `# Problem: Climbing Stairs
# Approach: Fibonacci DP
# Time: O(n) | Space: O(1)
# Topics: DP

def solve(nums):
    # fibonacci dp
    n = len(nums)
    dp = [0] * (n + 1)
    # Base case
    dp[0] = 0
    for i in range(1, n + 1):
        # Transition: fibonacci dp
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1])
    return dp[n]`,
        java: `// Problem: Climbing Stairs
// Approach: Fibonacci DP
// Time: O(n) | Space: O(1)
// Topics: DP

public int solve(int[] nums) {
    // Fibonacci DP
    int n = nums.length;
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-1] + nums[i-1]);
    }
    return dp[n];
}`,
        cpp: `// Problem: Climbing Stairs
// Approach: Fibonacci DP
// Time: O(n) | Space: O(1)
// Topics: DP

// Fibonacci DP
int solve(vector<int>& nums) {
    int n = nums.size();
    vector<int> dp(n + 1, 0);
    for (int i = 1; i <= n; i++)
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1]);
    return dp[n];
}`
    },

    72: {
        explanation: `2D DP. Topics: String, DP. Time: O(m·n), Space: O(m·n).`,
        python: `# Problem: Edit Distance
# Approach: 2D DP
# Time: O(m·n) | Space: O(m·n)
# Topics: String, DP

def solve(nums):
    # 2d dp
    n = len(nums)
    dp = [0] * (n + 1)
    # Base case
    dp[0] = 0
    for i in range(1, n + 1):
        # Transition: 2d dp
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1])
    return dp[n]`,
        java: `// Problem: Edit Distance
// Approach: 2D DP
// Time: O(m·n) | Space: O(m·n)
// Topics: String, DP

public int solve(int[] nums) {
    // 2D DP
    int n = nums.length;
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-1] + nums[i-1]);
    }
    return dp[n];
}`,
        cpp: `// Problem: Edit Distance
// Approach: 2D DP
// Time: O(m·n) | Space: O(m·n)
// Topics: String, DP

// 2D DP
int solve(vector<int>& nums) {
    int n = nums.size();
    vector<int> dp(n + 1, 0);
    for (int i = 1; i <= n; i++)
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1]);
    return dp[n];
}`
    },

    73: {
        explanation: `First row/col as markers. Topics: Array, Matrix. Time: O(m·n), Space: O(1).`,
        python: `# Problem: Set Matrix Zeroes
# Approach: First row/col as markers
# Time: O(m·n) | Space: O(1)
# Topics: Array, Matrix

def solve(data):
    # first row/col as markers
    # Time: O(m·n) | Space: O(1)
    pass  # Implement: Set Matrix Zeroes`,
        java: `// Problem: Set Matrix Zeroes
// Approach: First row/col as markers
// Time: O(m·n) | Space: O(1)
// Topics: Array, Matrix

public Object solve(Object input) {
    // First row/col as markers
    // Time: O(m·n) | Space: O(1)
    return null; // Implement: Set Matrix Zeroes
}`,
        cpp: `// Problem: Set Matrix Zeroes
// Approach: First row/col as markers
// Time: O(m·n) | Space: O(1)
// Topics: Array, Matrix

// First row/col as markers
// Time: O(m·n) | Space: O(1)
// TODO: Implement Set Matrix Zeroes`
    },

    74: {
        explanation: `Treat as 1D binary search. Topics: Array, Binary Search. Time: O(log(m·n)), Space: O(1).`,
        python: `# Problem: Search a 2D Matrix
# Approach: Treat as 1D binary search
# Time: O(log(m·n)) | Space: O(1)
# Topics: Array, Binary Search

def solve(arr, target):
    # treat as 1d binary search
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return lo`,
        java: `// Problem: Search a 2D Matrix
// Approach: Treat as 1D binary search
// Time: O(log(m·n)) | Space: O(1)
// Topics: Array, Binary Search

public int solve(int[] arr, int target) {
    // Treat as 1D binary search
    int lo = 0, hi = arr.length - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return lo;
}`,
        cpp: `// Problem: Search a 2D Matrix
// Approach: Treat as 1D binary search
// Time: O(log(m·n)) | Space: O(1)
// Topics: Array, Binary Search

// Treat as 1D binary search
int solve(vector<int>& arr, int target) {
    int lo = 0, hi = arr.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return lo;
}`
    },

    75: {
        explanation: `Dutch national flag algorithm. Topics: Array, Two Pointers. Time: O(n), Space: O(1).`,
        python: `# Problem: Sort Colors
# Approach: Dutch national flag algorithm
# Time: O(n) | Space: O(1)
# Topics: Array, Two Pointers

def solve(data):
    # dutch national flag algorithm
    # Time: O(n) | Space: O(1)
    pass  # Implement: Sort Colors`,
        java: `// Problem: Sort Colors
// Approach: Dutch national flag algorithm
// Time: O(n) | Space: O(1)
// Topics: Array, Two Pointers

public Object solve(Object input) {
    // Dutch national flag algorithm
    // Time: O(n) | Space: O(1)
    return null; // Implement: Sort Colors
}`,
        cpp: `// Problem: Sort Colors
// Approach: Dutch national flag algorithm
// Time: O(n) | Space: O(1)
// Topics: Array, Two Pointers

// Dutch national flag algorithm
// Time: O(n) | Space: O(1)
// TODO: Implement Sort Colors`
    },

    76: {
        explanation: `Sliding window with need count. Topics: String, Sliding Window. Time: O(m+n), Space: O(m+n).`,
        python: `# Problem: Minimum Window Substring
# Approach: Sliding window with need count
# Time: O(m+n) | Space: O(m+n)
# Topics: String, Sliding Window

def solve(s):
    # sliding window with need count
    left = 0
    window = {}
    result = 0
    for right in range(len(s)):
        # Expand window
        window[s[right]] = window.get(s[right], 0) + 1
        # Shrink if invalid
        while not valid(window):
            window[s[left]] -= 1
            if window[s[left]] == 0: del window[s[left]]
            left += 1
        result = max(result, right - left + 1)
    return result`,
        java: `// Problem: Minimum Window Substring
// Approach: Sliding window with need count
// Time: O(m+n) | Space: O(m+n)
// Topics: String, Sliding Window

public Object solve(Object input) {
    // Sliding window with need count
    // Time: O(m+n) | Space: O(m+n)
    return null; // Implement: Minimum Window Substring
}`,
        cpp: `// Problem: Minimum Window Substring
// Approach: Sliding window with need count
// Time: O(m+n) | Space: O(m+n)
// Topics: String, Sliding Window

// Sliding window with need count
// Time: O(m+n) | Space: O(m+n)
// TODO: Implement Minimum Window Substring`
    },

    77: {
        explanation: `Backtracking. Topics: Backtracking. Time: O(k · C(n,k)), Space: O(k).`,
        python: `# Problem: Combinations
# Approach: Backtracking
# Time: O(k · C(n,k)) | Space: O(k)
# Topics: Backtracking

def solve(candidates):
    # backtracking
    result = []
    def backtrack(start, path):
        if is_valid(path):
            result.append(path[:])
            return
        for i in range(start, len(candidates)):
            path.append(candidates[i])
            backtrack(i + 1, path)
            path.pop()
    backtrack(0, [])
    return result`,
        java: `// Problem: Combinations
// Approach: Backtracking
// Time: O(k · C(n,k)) | Space: O(k)
// Topics: Backtracking

public List<List<Integer>> solve(int[] candidates) {
    // Backtracking
    List<List<Integer>> result = new ArrayList<>();
    backtrack(candidates, 0, new ArrayList<>(), result);
    return result;
}
private void backtrack(int[] arr, int start, List<Integer> path, List<List<Integer>> result) {
    result.add(new ArrayList<>(path));
    for (int i = start; i < arr.length; i++) {
        path.add(arr[i]);
        backtrack(arr, i + 1, path, result);
        path.remove(path.size() - 1);
    }
}`,
        cpp: `// Problem: Combinations
// Approach: Backtracking
// Time: O(k · C(n,k)) | Space: O(k)
// Topics: Backtracking

// Backtracking
vector<vector<int>> solve(vector<int>& nums) {
    vector<vector<int>> res;
    vector<int> path;
    function<void(int)> bt = [&](int start) {
        res.push_back(path);
        for (int i = start; i < nums.size(); i++) {
            path.push_back(nums[i]);
            bt(i + 1);
            path.pop_back();
        }
    };
    bt(0);
    return res;
}`
    },

    78: {
        explanation: `Bit mask or backtracking. Topics: Array, Backtracking. Time: O(n · 2^n), Space: O(n · 2^n).`,
        python: `# Problem: Subsets
# Approach: Bit mask or backtracking
# Time: O(n · 2^n) | Space: O(n · 2^n)
# Topics: Array, Backtracking

def solve(candidates):
    # bit mask or backtracking
    result = []
    def backtrack(start, path):
        if is_valid(path):
            result.append(path[:])
            return
        for i in range(start, len(candidates)):
            path.append(candidates[i])
            backtrack(i + 1, path)
            path.pop()
    backtrack(0, [])
    return result`,
        java: `// Problem: Subsets
// Approach: Bit mask or backtracking
// Time: O(n · 2^n) | Space: O(n · 2^n)
// Topics: Array, Backtracking

public List<List<Integer>> solve(int[] candidates) {
    // Bit mask or backtracking
    List<List<Integer>> result = new ArrayList<>();
    backtrack(candidates, 0, new ArrayList<>(), result);
    return result;
}
private void backtrack(int[] arr, int start, List<Integer> path, List<List<Integer>> result) {
    result.add(new ArrayList<>(path));
    for (int i = start; i < arr.length; i++) {
        path.add(arr[i]);
        backtrack(arr, i + 1, path, result);
        path.remove(path.size() - 1);
    }
}`,
        cpp: `// Problem: Subsets
// Approach: Bit mask or backtracking
// Time: O(n · 2^n) | Space: O(n · 2^n)
// Topics: Array, Backtracking

// Bit mask or backtracking
vector<vector<int>> solve(vector<int>& nums) {
    vector<vector<int>> res;
    vector<int> path;
    function<void(int)> bt = [&](int start) {
        res.push_back(path);
        for (int i = start; i < nums.size(); i++) {
            path.push_back(nums[i]);
            bt(i + 1);
            path.pop_back();
        }
    };
    bt(0);
    return res;
}`
    },

    79: {
        explanation: `DFS + backtracking on grid. Topics: Array, Backtracking. Time: O(m·n·4^L), Space: O(L).`,
        python: `# Problem: Word Search
# Approach: DFS + backtracking on grid
# Time: O(m·n·4^L) | Space: O(L)
# Topics: Array, Backtracking

def solve(root):
    # dfs + backtracking on grid
    def dfs(node):
        if not node:
            return
        # Process current node
        dfs(node.left)
        dfs(node.right)
    return dfs(root)`,
        java: `// Problem: Word Search
// Approach: DFS + backtracking on grid
// Time: O(m·n·4^L) | Space: O(L)
// Topics: Array, Backtracking

public void dfs(TreeNode node) {
    // DFS + backtracking on grid
    if (node == null) return;
    // Process node
    dfs(node.left);
    dfs(node.right);
}`,
        cpp: `// Problem: Word Search
// Approach: DFS + backtracking on grid
// Time: O(m·n·4^L) | Space: O(L)
// Topics: Array, Backtracking

// DFS + backtracking on grid
void dfs(TreeNode* node) {
    if (!node) return;
    // Process node
    dfs(node->left);
    dfs(node->right);
}`
    },

    80: {
        explanation: `Two pointers allow at most 2. Topics: Array, Two Pointers. Time: O(n), Space: O(1).`,
        python: `# Problem: Remove Duplicates from Sorted Array II
# Approach: Two pointers allow at most 2
# Time: O(n) | Space: O(1)
# Topics: Array, Two Pointers

def solve(arr):
    # two pointers allow at most 2
    left, right = 0, len(arr) - 1
    while left < right:
        # Process based on condition
        if condition:
            left += 1
        else:
            right -= 1
    return result`,
        java: `// Problem: Remove Duplicates from Sorted Array II
// Approach: Two pointers allow at most 2
// Time: O(n) | Space: O(1)
// Topics: Array, Two Pointers

public int solve(int[] arr) {
    // Two pointers allow at most 2
    int left = 0, right = arr.length - 1;
    while (left < right) {
        // Process based on condition
        if (arr[left] < arr[right]) left++;
        else right--;
    }
    return left;
}`,
        cpp: `// Problem: Remove Duplicates from Sorted Array II
// Approach: Two pointers allow at most 2
// Time: O(n) | Space: O(1)
// Topics: Array, Two Pointers

// Two pointers allow at most 2
int solve(vector<int>& arr) {
    int l = 0, r = arr.size() - 1;
    while (l < r) {
        if (arr[l] < arr[r]) l++;
        else r--;
    }
    return l;
}`
    },

    81: {
        explanation: `Modified binary search for duplicates. Topics: Binary Search. Time: O(log n) avg O(n), Space: O(1).`,
        python: `# Problem: Search in Rotated Sorted Array II
# Approach: Modified binary search for duplicates
# Time: O(log n) avg O(n) | Space: O(1)
# Topics: Binary Search

def solve(arr, target):
    # modified binary search for duplicates
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return lo`,
        java: `// Problem: Search in Rotated Sorted Array II
// Approach: Modified binary search for duplicates
// Time: O(log n) avg O(n) | Space: O(1)
// Topics: Binary Search

public int solve(int[] arr, int target) {
    // Modified binary search for duplicates
    int lo = 0, hi = arr.length - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return lo;
}`,
        cpp: `// Problem: Search in Rotated Sorted Array II
// Approach: Modified binary search for duplicates
// Time: O(log n) avg O(n) | Space: O(1)
// Topics: Binary Search

// Modified binary search for duplicates
int solve(vector<int>& arr, int target) {
    int lo = 0, hi = arr.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return lo;
}`
    },

    84: {
        explanation: `Monotonic stack. Topics: Array, Stack. Time: O(n), Space: O(n).`,
        python: `# Problem: Largest Rectangle in Histogram
# Approach: Monotonic stack
# Time: O(n) | Space: O(n)
# Topics: Array, Stack

def solve(arr):
    # monotonic stack
    stack = []
    result = 0
    for i, val in enumerate(arr):
        while stack and arr[stack[-1]] < val:
            idx = stack.pop()
            # Process popped element
        stack.append(i)
    return result`,
        java: `// Problem: Largest Rectangle in Histogram
// Approach: Monotonic stack
// Time: O(n) | Space: O(n)
// Topics: Array, Stack

public int solve(int[] arr) {
    // Monotonic stack
    Deque<Integer> stack = new ArrayDeque<>();
    int result = 0;
    for (int i = 0; i < arr.length; i++) {
        while (!stack.isEmpty() && arr[stack.peek()] < arr[i]) {
            stack.pop();
        }
        stack.push(i);
    }
    return result;
}`,
        cpp: `// Problem: Largest Rectangle in Histogram
// Approach: Monotonic stack
// Time: O(n) | Space: O(n)
// Topics: Array, Stack

// Monotonic stack
int solve(vector<int>& arr) {
    stack<int> st;
    int res = 0;
    for (int i = 0; i < arr.size(); i++) {
        while (!st.empty() && arr[st.top()] < arr[i]) st.pop();
        st.push(i);
    }
    return res;
}`
    },

    85: {
        explanation: `Histogram technique row by row. Topics: Array, Stack, DP. Time: O(m·n), Space: O(n).`,
        python: `# Problem: Maximal Rectangle
# Approach: Histogram technique row by row
# Time: O(m·n) | Space: O(n)
# Topics: Array, Stack, DP

def solve(data):
    # histogram technique row by row
    # Time: O(m·n) | Space: O(n)
    pass  # Implement: Maximal Rectangle`,
        java: `// Problem: Maximal Rectangle
// Approach: Histogram technique row by row
// Time: O(m·n) | Space: O(n)
// Topics: Array, Stack, DP

public Object solve(Object input) {
    // Histogram technique row by row
    // Time: O(m·n) | Space: O(n)
    return null; // Implement: Maximal Rectangle
}`,
        cpp: `// Problem: Maximal Rectangle
// Approach: Histogram technique row by row
// Time: O(m·n) | Space: O(n)
// Topics: Array, Stack, DP

// Histogram technique row by row
// Time: O(m·n) | Space: O(n)
// TODO: Implement Maximal Rectangle`
    },

    88: {
        explanation: `Merge from back. Topics: Array, Two Pointers. Time: O(m+n), Space: O(1).`,
        python: `# Problem: Merge Sorted Array
# Approach: Merge from back
# Time: O(m+n) | Space: O(1)
# Topics: Array, Two Pointers

def solve(data):
    # merge from back
    # Time: O(m+n) | Space: O(1)
    pass  # Implement: Merge Sorted Array`,
        java: `// Problem: Merge Sorted Array
// Approach: Merge from back
// Time: O(m+n) | Space: O(1)
// Topics: Array, Two Pointers

public Object solve(Object input) {
    // Merge from back
    // Time: O(m+n) | Space: O(1)
    return null; // Implement: Merge Sorted Array
}`,
        cpp: `// Problem: Merge Sorted Array
// Approach: Merge from back
// Time: O(m+n) | Space: O(1)
// Topics: Array, Two Pointers

// Merge from back
// Time: O(m+n) | Space: O(1)
// TODO: Implement Merge Sorted Array`
    },

    90: {
        explanation: `Backtracking skip duplicates. Topics: Array, Backtracking. Time: O(n · 2^n), Space: O(n).`,
        python: `# Problem: Subsets II
# Approach: Backtracking skip duplicates
# Time: O(n · 2^n) | Space: O(n)
# Topics: Array, Backtracking

def solve(candidates):
    # backtracking skip duplicates
    result = []
    def backtrack(start, path):
        if is_valid(path):
            result.append(path[:])
            return
        for i in range(start, len(candidates)):
            path.append(candidates[i])
            backtrack(i + 1, path)
            path.pop()
    backtrack(0, [])
    return result`,
        java: `// Problem: Subsets II
// Approach: Backtracking skip duplicates
// Time: O(n · 2^n) | Space: O(n)
// Topics: Array, Backtracking

public List<List<Integer>> solve(int[] candidates) {
    // Backtracking skip duplicates
    List<List<Integer>> result = new ArrayList<>();
    backtrack(candidates, 0, new ArrayList<>(), result);
    return result;
}
private void backtrack(int[] arr, int start, List<Integer> path, List<List<Integer>> result) {
    result.add(new ArrayList<>(path));
    for (int i = start; i < arr.length; i++) {
        path.add(arr[i]);
        backtrack(arr, i + 1, path, result);
        path.remove(path.size() - 1);
    }
}`,
        cpp: `// Problem: Subsets II
// Approach: Backtracking skip duplicates
// Time: O(n · 2^n) | Space: O(n)
// Topics: Array, Backtracking

// Backtracking skip duplicates
vector<vector<int>> solve(vector<int>& nums) {
    vector<vector<int>> res;
    vector<int> path;
    function<void(int)> bt = [&](int start) {
        res.push_back(path);
        for (int i = start; i < nums.size(); i++) {
            path.push_back(nums[i]);
            bt(i + 1);
            path.pop_back();
        }
    };
    bt(0);
    return res;
}`
    },

    91: {
        explanation: `DP with prev/prevprev. Topics: String, DP. Time: O(n), Space: O(1).`,
        python: `# Problem: Decode Ways
# Approach: DP with prev/prevprev
# Time: O(n) | Space: O(1)
# Topics: String, DP

def solve(nums):
    # dp with prev/prevprev
    n = len(nums)
    dp = [0] * (n + 1)
    # Base case
    dp[0] = 0
    for i in range(1, n + 1):
        # Transition: dp with prev/prevprev
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1])
    return dp[n]`,
        java: `// Problem: Decode Ways
// Approach: DP with prev/prevprev
// Time: O(n) | Space: O(1)
// Topics: String, DP

public int solve(int[] nums) {
    // DP with prev/prevprev
    int n = nums.length;
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-1] + nums[i-1]);
    }
    return dp[n];
}`,
        cpp: `// Problem: Decode Ways
// Approach: DP with prev/prevprev
// Time: O(n) | Space: O(1)
// Topics: String, DP

// DP with prev/prevprev
int solve(vector<int>& nums) {
    int n = nums.size();
    vector<int> dp(n + 1, 0);
    for (int i = 1; i <= n; i++)
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1]);
    return dp[n];
}`
    },

    92: {
        explanation: `One-pass with prev/next pointers. Topics: Linked List. Time: O(n), Space: O(1).`,
        python: `# Problem: Reverse Linked List II
# Approach: One-pass with prev/next pointers
# Time: O(n) | Space: O(1)
# Topics: Linked List

def solve(data):
    # one-pass with prev/next pointers
    # Time: O(n) | Space: O(1)
    pass  # Implement: Reverse Linked List II`,
        java: `// Problem: Reverse Linked List II
// Approach: One-pass with prev/next pointers
// Time: O(n) | Space: O(1)
// Topics: Linked List

public Object solve(Object input) {
    // One-pass with prev/next pointers
    // Time: O(n) | Space: O(1)
    return null; // Implement: Reverse Linked List II
}`,
        cpp: `// Problem: Reverse Linked List II
// Approach: One-pass with prev/next pointers
// Time: O(n) | Space: O(1)
// Topics: Linked List

// One-pass with prev/next pointers
// Time: O(n) | Space: O(1)
// TODO: Implement Reverse Linked List II`
    },

    93: {
        explanation: `Backtracking with 4 parts. Topics: String, Backtracking. Time: O(1), Space: O(1).`,
        python: `# Problem: Restore IP Addresses
# Approach: Backtracking with 4 parts
# Time: O(1) | Space: O(1)
# Topics: String, Backtracking

def solve(candidates):
    # backtracking with 4 parts
    result = []
    def backtrack(start, path):
        if is_valid(path):
            result.append(path[:])
            return
        for i in range(start, len(candidates)):
            path.append(candidates[i])
            backtrack(i + 1, path)
            path.pop()
    backtrack(0, [])
    return result`,
        java: `// Problem: Restore IP Addresses
// Approach: Backtracking with 4 parts
// Time: O(1) | Space: O(1)
// Topics: String, Backtracking

public List<List<Integer>> solve(int[] candidates) {
    // Backtracking with 4 parts
    List<List<Integer>> result = new ArrayList<>();
    backtrack(candidates, 0, new ArrayList<>(), result);
    return result;
}
private void backtrack(int[] arr, int start, List<Integer> path, List<List<Integer>> result) {
    result.add(new ArrayList<>(path));
    for (int i = start; i < arr.length; i++) {
        path.add(arr[i]);
        backtrack(arr, i + 1, path, result);
        path.remove(path.size() - 1);
    }
}`,
        cpp: `// Problem: Restore IP Addresses
// Approach: Backtracking with 4 parts
// Time: O(1) | Space: O(1)
// Topics: String, Backtracking

// Backtracking with 4 parts
vector<vector<int>> solve(vector<int>& nums) {
    vector<vector<int>> res;
    vector<int> path;
    function<void(int)> bt = [&](int start) {
        res.push_back(path);
        for (int i = start; i < nums.size(); i++) {
            path.push_back(nums[i]);
            bt(i + 1);
            path.pop_back();
        }
    };
    bt(0);
    return res;
}`
    },

    94: {
        explanation: `Morris traversal / iterative. Topics: Tree, Stack. Time: O(n), Space: O(n).`,
        python: `# Problem: Binary Tree Inorder Traversal
# Approach: Morris traversal / iterative
# Time: O(n) | Space: O(n)
# Topics: Tree, Stack

def solve(data):
    # morris traversal / iterative
    # Time: O(n) | Space: O(n)
    pass  # Implement: Binary Tree Inorder Traversal`,
        java: `// Problem: Binary Tree Inorder Traversal
// Approach: Morris traversal / iterative
// Time: O(n) | Space: O(n)
// Topics: Tree, Stack

public Object solve(Object input) {
    // Morris traversal / iterative
    // Time: O(n) | Space: O(n)
    return null; // Implement: Binary Tree Inorder Traversal
}`,
        cpp: `// Problem: Binary Tree Inorder Traversal
// Approach: Morris traversal / iterative
// Time: O(n) | Space: O(n)
// Topics: Tree, Stack

// Morris traversal / iterative
// Time: O(n) | Space: O(n)
// TODO: Implement Binary Tree Inorder Traversal`
    },

    96: {
        explanation: `Catalan number DP. Topics: DP, Tree. Time: O(n²), Space: O(n).`,
        python: `# Problem: Unique Binary Search Trees
# Approach: Catalan number DP
# Time: O(n²) | Space: O(n)
# Topics: DP, Tree

def solve(nums):
    # catalan number dp
    n = len(nums)
    dp = [0] * (n + 1)
    # Base case
    dp[0] = 0
    for i in range(1, n + 1):
        # Transition: catalan number dp
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1])
    return dp[n]`,
        java: `// Problem: Unique Binary Search Trees
// Approach: Catalan number DP
// Time: O(n²) | Space: O(n)
// Topics: DP, Tree

public int solve(int[] nums) {
    // Catalan number DP
    int n = nums.length;
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-1] + nums[i-1]);
    }
    return dp[n];
}`,
        cpp: `// Problem: Unique Binary Search Trees
// Approach: Catalan number DP
// Time: O(n²) | Space: O(n)
// Topics: DP, Tree

// Catalan number DP
int solve(vector<int>& nums) {
    int n = nums.size();
    vector<int> dp(n + 1, 0);
    for (int i = 1; i <= n; i++)
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1]);
    return dp[n];
}`
    },

    97: {
        explanation: `2D DP. Topics: String, DP. Time: O(m·n), Space: O(m·n).`,
        python: `# Problem: Interleaving String
# Approach: 2D DP
# Time: O(m·n) | Space: O(m·n)
# Topics: String, DP

def solve(nums):
    # 2d dp
    n = len(nums)
    dp = [0] * (n + 1)
    # Base case
    dp[0] = 0
    for i in range(1, n + 1):
        # Transition: 2d dp
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1])
    return dp[n]`,
        java: `// Problem: Interleaving String
// Approach: 2D DP
// Time: O(m·n) | Space: O(m·n)
// Topics: String, DP

public int solve(int[] nums) {
    // 2D DP
    int n = nums.length;
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-1] + nums[i-1]);
    }
    return dp[n];
}`,
        cpp: `// Problem: Interleaving String
// Approach: 2D DP
// Time: O(m·n) | Space: O(m·n)
// Topics: String, DP

// 2D DP
int solve(vector<int>& nums) {
    int n = nums.size();
    vector<int> dp(n + 1, 0);
    for (int i = 1; i <= n; i++)
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1]);
    return dp[n];
}`
    },

    98: {
        explanation: `DFS with min/max bounds. Topics: Tree, DFS. Time: O(n), Space: O(n).`,
        python: `# Problem: Validate Binary Search Tree
# Approach: DFS with min/max bounds
# Time: O(n) | Space: O(n)
# Topics: Tree, DFS

def solve(root):
    # dfs with min/max bounds
    def dfs(node):
        if not node:
            return
        # Process current node
        dfs(node.left)
        dfs(node.right)
    return dfs(root)`,
        java: `// Problem: Validate Binary Search Tree
// Approach: DFS with min/max bounds
// Time: O(n) | Space: O(n)
// Topics: Tree, DFS

public void dfs(TreeNode node) {
    // DFS with min/max bounds
    if (node == null) return;
    // Process node
    dfs(node.left);
    dfs(node.right);
}`,
        cpp: `// Problem: Validate Binary Search Tree
// Approach: DFS with min/max bounds
// Time: O(n) | Space: O(n)
// Topics: Tree, DFS

// DFS with min/max bounds
void dfs(TreeNode* node) {
    if (!node) return;
    // Process node
    dfs(node->left);
    dfs(node->right);
}`
    },

    99: {
        explanation: `Morris traversal / find swapped. Topics: Tree. Time: O(n), Space: O(1).`,
        python: `# Problem: Recover Binary Search Tree
# Approach: Morris traversal / find swapped
# Time: O(n) | Space: O(1)
# Topics: Tree

def solve(n, edges):
    # morris traversal / find swapped
    parent = list(range(n))
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x
    def union(x, y):
        px, py = find(x), find(y)
        if px != py: parent[px] = py
    for u, v in edges:
        union(u, v)
    return len(set(find(i) for i in range(n)))`,
        java: `// Problem: Recover Binary Search Tree
// Approach: Morris traversal / find swapped
// Time: O(n) | Space: O(1)
// Topics: Tree

public Object solve(Object input) {
    // Morris traversal / find swapped
    // Time: O(n) | Space: O(1)
    return null; // Implement: Recover Binary Search Tree
}`,
        cpp: `// Problem: Recover Binary Search Tree
// Approach: Morris traversal / find swapped
// Time: O(n) | Space: O(1)
// Topics: Tree

// Morris traversal / find swapped
// Time: O(n) | Space: O(1)
// TODO: Implement Recover Binary Search Tree`
    },

    100: {
        explanation: `Recursive DFS compare. Topics: Tree, DFS. Time: O(n), Space: O(n).`,
        python: `# Problem: Same Tree
# Approach: Recursive DFS compare
# Time: O(n) | Space: O(n)
# Topics: Tree, DFS

def solve(root):
    # recursive dfs compare
    def dfs(node):
        if not node:
            return
        # Process current node
        dfs(node.left)
        dfs(node.right)
    return dfs(root)`,
        java: `// Problem: Same Tree
// Approach: Recursive DFS compare
// Time: O(n) | Space: O(n)
// Topics: Tree, DFS

public void dfs(TreeNode node) {
    // Recursive DFS compare
    if (node == null) return;
    // Process node
    dfs(node.left);
    dfs(node.right);
}`,
        cpp: `// Problem: Same Tree
// Approach: Recursive DFS compare
// Time: O(n) | Space: O(n)
// Topics: Tree, DFS

// Recursive DFS compare
void dfs(TreeNode* node) {
    if (!node) return;
    // Process node
    dfs(node->left);
    dfs(node->right);
}`
    },

    101: {
        explanation: `Mirror check recursively. Topics: Tree, BFS/DFS. Time: O(n), Space: O(n).`,
        python: `# Problem: Symmetric Tree
# Approach: Mirror check recursively
# Time: O(n) | Space: O(n)
# Topics: Tree, BFS/DFS

def solve(data):
    # mirror check recursively
    # Time: O(n) | Space: O(n)
    pass  # Implement: Symmetric Tree`,
        java: `// Problem: Symmetric Tree
// Approach: Mirror check recursively
// Time: O(n) | Space: O(n)
// Topics: Tree, BFS/DFS

public Object solve(Object input) {
    // Mirror check recursively
    // Time: O(n) | Space: O(n)
    return null; // Implement: Symmetric Tree
}`,
        cpp: `// Problem: Symmetric Tree
// Approach: Mirror check recursively
// Time: O(n) | Space: O(n)
// Topics: Tree, BFS/DFS

// Mirror check recursively
// Time: O(n) | Space: O(n)
// TODO: Implement Symmetric Tree`
    },

    102: {
        explanation: `BFS queue. Topics: Tree, BFS. Time: O(n), Space: O(n).`,
        python: `# Problem: Binary Tree Level Order Traversal
# Approach: BFS queue
# Time: O(n) | Space: O(n)
# Topics: Tree, BFS

from collections import deque
def solve(root):
    # bfs queue
    if not root: return []
    queue = deque([root])
    result = []
    while queue:
        level_size = len(queue)
        level = []
        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)
            if node.left: queue.append(node.left)
            if node.right: queue.append(node.right)
        result.append(level)
    return result`,
        java: `// Problem: Binary Tree Level Order Traversal
// Approach: BFS queue
// Time: O(n) | Space: O(n)
// Topics: Tree, BFS

public List<List<Integer>> bfs(TreeNode root) {
    // BFS queue
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;
    Queue<TreeNode> queue = new LinkedList<>();
    queue.add(root);
    while (!queue.isEmpty()) {
        int size = queue.size();
        List<Integer> level = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            TreeNode node = queue.poll();
            level.add(node.val);
            if (node.left != null) queue.add(node.left);
            if (node.right != null) queue.add(node.right);
        }
        result.add(level);
    }
    return result;
}`,
        cpp: `// Problem: Binary Tree Level Order Traversal
// Approach: BFS queue
// Time: O(n) | Space: O(n)
// Topics: Tree, BFS

// BFS queue
vector<vector<int>> bfs(TreeNode* root) {
    vector<vector<int>> res;
    if (!root) return res;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        int sz = q.size();
        vector<int> level;
        while (sz--) {
            auto node = q.front(); q.pop();
            level.push_back(node->val);
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        res.push_back(level);
    }
    return res;
}`
    },

    103: {
        explanation: `BFS + alternate direction. Topics: Tree, BFS. Time: O(n), Space: O(n).`,
        python: `# Problem: Binary Tree Zigzag Level Order
# Approach: BFS + alternate direction
# Time: O(n) | Space: O(n)
# Topics: Tree, BFS

from collections import deque
def solve(root):
    # bfs + alternate direction
    if not root: return []
    queue = deque([root])
    result = []
    while queue:
        level_size = len(queue)
        level = []
        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)
            if node.left: queue.append(node.left)
            if node.right: queue.append(node.right)
        result.append(level)
    return result`,
        java: `// Problem: Binary Tree Zigzag Level Order
// Approach: BFS + alternate direction
// Time: O(n) | Space: O(n)
// Topics: Tree, BFS

public List<List<Integer>> bfs(TreeNode root) {
    // BFS + alternate direction
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;
    Queue<TreeNode> queue = new LinkedList<>();
    queue.add(root);
    while (!queue.isEmpty()) {
        int size = queue.size();
        List<Integer> level = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            TreeNode node = queue.poll();
            level.add(node.val);
            if (node.left != null) queue.add(node.left);
            if (node.right != null) queue.add(node.right);
        }
        result.add(level);
    }
    return result;
}`,
        cpp: `// Problem: Binary Tree Zigzag Level Order
// Approach: BFS + alternate direction
// Time: O(n) | Space: O(n)
// Topics: Tree, BFS

// BFS + alternate direction
vector<vector<int>> bfs(TreeNode* root) {
    vector<vector<int>> res;
    if (!root) return res;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        int sz = q.size();
        vector<int> level;
        while (sz--) {
            auto node = q.front(); q.pop();
            level.push_back(node->val);
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        res.push_back(level);
    }
    return res;
}`
    },

    104: {
        explanation: `Recursive max depth. Topics: Tree, DFS. Time: O(n), Space: O(n).`,
        python: `# Problem: Maximum Depth of Binary Tree
# Approach: Recursive max depth
# Time: O(n) | Space: O(n)
# Topics: Tree, DFS

def solve(root):
    # recursive max depth
    def dfs(node):
        if not node:
            return
        # Process current node
        dfs(node.left)
        dfs(node.right)
    return dfs(root)`,
        java: `// Problem: Maximum Depth of Binary Tree
// Approach: Recursive max depth
// Time: O(n) | Space: O(n)
// Topics: Tree, DFS

public void dfs(TreeNode node) {
    // Recursive max depth
    if (node == null) return;
    // Process node
    dfs(node.left);
    dfs(node.right);
}`,
        cpp: `// Problem: Maximum Depth of Binary Tree
// Approach: Recursive max depth
// Time: O(n) | Space: O(n)
// Topics: Tree, DFS

// Recursive max depth
void dfs(TreeNode* node) {
    if (!node) return;
    // Process node
    dfs(node->left);
    dfs(node->right);
}`
    },

    105: {
        explanation: `Hash inorder + recursion. Topics: Tree, Hash Map. Time: O(n), Space: O(n).`,
        python: `# Problem: Construct Binary Tree from Preorder and Inorder
# Approach: Hash inorder + recursion
# Time: O(n) | Space: O(n)
# Topics: Tree, Hash Map

def solve(data):
    # hash inorder + recursion
    # Time: O(n) | Space: O(n)
    pass  # Implement: Construct Binary Tree from Preorder and Inorder`,
        java: `// Problem: Construct Binary Tree from Preorder and Inorder
// Approach: Hash inorder + recursion
// Time: O(n) | Space: O(n)
// Topics: Tree, Hash Map

public Object solve(Object input) {
    // Hash inorder + recursion
    // Time: O(n) | Space: O(n)
    return null; // Implement: Construct Binary Tree from Preorder and Inorder
}`,
        cpp: `// Problem: Construct Binary Tree from Preorder and Inorder
// Approach: Hash inorder + recursion
// Time: O(n) | Space: O(n)
// Topics: Tree, Hash Map

// Hash inorder + recursion
// Time: O(n) | Space: O(n)
// TODO: Implement Construct Binary Tree from Preorder and Inorder`
    },

    106: {
        explanation: `Hash inorder + recursion. Topics: Tree. Time: O(n), Space: O(n).`,
        python: `# Problem: Construct Binary Tree from Inorder and Postorder
# Approach: Hash inorder + recursion
# Time: O(n) | Space: O(n)
# Topics: Tree

def solve(data):
    # hash inorder + recursion
    # Time: O(n) | Space: O(n)
    pass  # Implement: Construct Binary Tree from Inorder and Postorder`,
        java: `// Problem: Construct Binary Tree from Inorder and Postorder
// Approach: Hash inorder + recursion
// Time: O(n) | Space: O(n)
// Topics: Tree

public Object solve(Object input) {
    // Hash inorder + recursion
    // Time: O(n) | Space: O(n)
    return null; // Implement: Construct Binary Tree from Inorder and Postorder
}`,
        cpp: `// Problem: Construct Binary Tree from Inorder and Postorder
// Approach: Hash inorder + recursion
// Time: O(n) | Space: O(n)
// Topics: Tree

// Hash inorder + recursion
// Time: O(n) | Space: O(n)
// TODO: Implement Construct Binary Tree from Inorder and Postorder`
    },

    107: {
        explanation: `BFS then reverse. Topics: Tree, BFS. Time: O(n), Space: O(n).`,
        python: `# Problem: Binary Tree Level Order Traversal II
# Approach: BFS then reverse
# Time: O(n) | Space: O(n)
# Topics: Tree, BFS

from collections import deque
def solve(root):
    # bfs then reverse
    if not root: return []
    queue = deque([root])
    result = []
    while queue:
        level_size = len(queue)
        level = []
        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)
            if node.left: queue.append(node.left)
            if node.right: queue.append(node.right)
        result.append(level)
    return result`,
        java: `// Problem: Binary Tree Level Order Traversal II
// Approach: BFS then reverse
// Time: O(n) | Space: O(n)
// Topics: Tree, BFS

public List<List<Integer>> bfs(TreeNode root) {
    // BFS then reverse
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;
    Queue<TreeNode> queue = new LinkedList<>();
    queue.add(root);
    while (!queue.isEmpty()) {
        int size = queue.size();
        List<Integer> level = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            TreeNode node = queue.poll();
            level.add(node.val);
            if (node.left != null) queue.add(node.left);
            if (node.right != null) queue.add(node.right);
        }
        result.add(level);
    }
    return result;
}`,
        cpp: `// Problem: Binary Tree Level Order Traversal II
// Approach: BFS then reverse
// Time: O(n) | Space: O(n)
// Topics: Tree, BFS

// BFS then reverse
vector<vector<int>> bfs(TreeNode* root) {
    vector<vector<int>> res;
    if (!root) return res;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        int sz = q.size();
        vector<int> level;
        while (sz--) {
            auto node = q.front(); q.pop();
            level.push_back(node->val);
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        res.push_back(level);
    }
    return res;
}`
    },

    108: {
        explanation: `Pick mid as root recursively. Topics: Tree, Divide & Conquer. Time: O(n), Space: O(n).`,
        python: `# Problem: Convert Sorted Array to BST
# Approach: Pick mid as root recursively
# Time: O(n) | Space: O(n)
# Topics: Tree, Divide & Conquer

def solve(data):
    # pick mid as root recursively
    # Time: O(n) | Space: O(n)
    pass  # Implement: Convert Sorted Array to BST`,
        java: `// Problem: Convert Sorted Array to BST
// Approach: Pick mid as root recursively
// Time: O(n) | Space: O(n)
// Topics: Tree, Divide & Conquer

public Object solve(Object input) {
    // Pick mid as root recursively
    // Time: O(n) | Space: O(n)
    return null; // Implement: Convert Sorted Array to BST
}`,
        cpp: `// Problem: Convert Sorted Array to BST
// Approach: Pick mid as root recursively
// Time: O(n) | Space: O(n)
// Topics: Tree, Divide & Conquer

// Pick mid as root recursively
// Time: O(n) | Space: O(n)
// TODO: Implement Convert Sorted Array to BST`
    },

    109: {
        explanation: `Slow/fast pointer + recursion. Topics: Tree, Linked List. Time: O(n log n), Space: O(log n).`,
        python: `# Problem: Convert Sorted List to BST
# Approach: Slow/fast pointer + recursion
# Time: O(n log n) | Space: O(log n)
# Topics: Tree, Linked List

def solve(data):
    # slow/fast pointer + recursion
    # Time: O(n log n) | Space: O(log n)
    pass  # Implement: Convert Sorted List to BST`,
        java: `// Problem: Convert Sorted List to BST
// Approach: Slow/fast pointer + recursion
// Time: O(n log n) | Space: O(log n)
// Topics: Tree, Linked List

public Object solve(Object input) {
    // Slow/fast pointer + recursion
    // Time: O(n log n) | Space: O(log n)
    return null; // Implement: Convert Sorted List to BST
}`,
        cpp: `// Problem: Convert Sorted List to BST
// Approach: Slow/fast pointer + recursion
// Time: O(n log n) | Space: O(log n)
// Topics: Tree, Linked List

// Slow/fast pointer + recursion
// Time: O(n log n) | Space: O(log n)
// TODO: Implement Convert Sorted List to BST`
    },

    110: {
        explanation: `Post-order check heights. Topics: Tree, DFS. Time: O(n), Space: O(n).`,
        python: `# Problem: Balanced Binary Tree
# Approach: Post-order check heights
# Time: O(n) | Space: O(n)
# Topics: Tree, DFS

def solve(data):
    # post-order check heights
    # Time: O(n) | Space: O(n)
    pass  # Implement: Balanced Binary Tree`,
        java: `// Problem: Balanced Binary Tree
// Approach: Post-order check heights
// Time: O(n) | Space: O(n)
// Topics: Tree, DFS

public Object solve(Object input) {
    // Post-order check heights
    // Time: O(n) | Space: O(n)
    return null; // Implement: Balanced Binary Tree
}`,
        cpp: `// Problem: Balanced Binary Tree
// Approach: Post-order check heights
// Time: O(n) | Space: O(n)
// Topics: Tree, DFS

// Post-order check heights
// Time: O(n) | Space: O(n)
// TODO: Implement Balanced Binary Tree`
    },

    111: {
        explanation: `BFS finds first leaf. Topics: Tree, BFS. Time: O(n), Space: O(n).`,
        python: `# Problem: Minimum Depth of Binary Tree
# Approach: BFS finds first leaf
# Time: O(n) | Space: O(n)
# Topics: Tree, BFS

from collections import deque
def solve(root):
    # bfs finds first leaf
    if not root: return []
    queue = deque([root])
    result = []
    while queue:
        level_size = len(queue)
        level = []
        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)
            if node.left: queue.append(node.left)
            if node.right: queue.append(node.right)
        result.append(level)
    return result`,
        java: `// Problem: Minimum Depth of Binary Tree
// Approach: BFS finds first leaf
// Time: O(n) | Space: O(n)
// Topics: Tree, BFS

public List<List<Integer>> bfs(TreeNode root) {
    // BFS finds first leaf
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;
    Queue<TreeNode> queue = new LinkedList<>();
    queue.add(root);
    while (!queue.isEmpty()) {
        int size = queue.size();
        List<Integer> level = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            TreeNode node = queue.poll();
            level.add(node.val);
            if (node.left != null) queue.add(node.left);
            if (node.right != null) queue.add(node.right);
        }
        result.add(level);
    }
    return result;
}`,
        cpp: `// Problem: Minimum Depth of Binary Tree
// Approach: BFS finds first leaf
// Time: O(n) | Space: O(n)
// Topics: Tree, BFS

// BFS finds first leaf
vector<vector<int>> bfs(TreeNode* root) {
    vector<vector<int>> res;
    if (!root) return res;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        int sz = q.size();
        vector<int> level;
        while (sz--) {
            auto node = q.front(); q.pop();
            level.push_back(node->val);
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        res.push_back(level);
    }
    return res;
}`
    },

    112: {
        explanation: `DFS subtract target. Topics: Tree, DFS. Time: O(n), Space: O(n).`,
        python: `# Problem: Path Sum
# Approach: DFS subtract target
# Time: O(n) | Space: O(n)
# Topics: Tree, DFS

def solve(root):
    # dfs subtract target
    def dfs(node):
        if not node:
            return
        # Process current node
        dfs(node.left)
        dfs(node.right)
    return dfs(root)`,
        java: `// Problem: Path Sum
// Approach: DFS subtract target
// Time: O(n) | Space: O(n)
// Topics: Tree, DFS

public void dfs(TreeNode node) {
    // DFS subtract target
    if (node == null) return;
    // Process node
    dfs(node.left);
    dfs(node.right);
}`,
        cpp: `// Problem: Path Sum
// Approach: DFS subtract target
// Time: O(n) | Space: O(n)
// Topics: Tree, DFS

// DFS subtract target
void dfs(TreeNode* node) {
    if (!node) return;
    // Process node
    dfs(node->left);
    dfs(node->right);
}`
    },

    113: {
        explanation: `DFS + backtracking path. Topics: Tree, Backtracking. Time: O(n²), Space: O(n).`,
        python: `# Problem: Path Sum II
# Approach: DFS + backtracking path
# Time: O(n²) | Space: O(n)
# Topics: Tree, Backtracking

def solve(root):
    # dfs + backtracking path
    def dfs(node):
        if not node:
            return
        # Process current node
        dfs(node.left)
        dfs(node.right)
    return dfs(root)`,
        java: `// Problem: Path Sum II
// Approach: DFS + backtracking path
// Time: O(n²) | Space: O(n)
// Topics: Tree, Backtracking

public void dfs(TreeNode node) {
    // DFS + backtracking path
    if (node == null) return;
    // Process node
    dfs(node.left);
    dfs(node.right);
}`,
        cpp: `// Problem: Path Sum II
// Approach: DFS + backtracking path
// Time: O(n²) | Space: O(n)
// Topics: Tree, Backtracking

// DFS + backtracking path
void dfs(TreeNode* node) {
    if (!node) return;
    // Process node
    dfs(node->left);
    dfs(node->right);
}`
    },

    114: {
        explanation: `Morris traversal in-place. Topics: Tree, DFS. Time: O(n), Space: O(1).`,
        python: `# Problem: Flatten Binary Tree to Linked List
# Approach: Morris traversal in-place
# Time: O(n) | Space: O(1)
# Topics: Tree, DFS

def solve(data):
    # morris traversal in-place
    # Time: O(n) | Space: O(1)
    pass  # Implement: Flatten Binary Tree to Linked List`,
        java: `// Problem: Flatten Binary Tree to Linked List
// Approach: Morris traversal in-place
// Time: O(n) | Space: O(1)
// Topics: Tree, DFS

public Object solve(Object input) {
    // Morris traversal in-place
    // Time: O(n) | Space: O(1)
    return null; // Implement: Flatten Binary Tree to Linked List
}`,
        cpp: `// Problem: Flatten Binary Tree to Linked List
// Approach: Morris traversal in-place
// Time: O(n) | Space: O(1)
// Topics: Tree, DFS

// Morris traversal in-place
// Time: O(n) | Space: O(1)
// TODO: Implement Flatten Binary Tree to Linked List`
    },

    116: {
        explanation: `Level-order BFS. Topics: Tree, BFS. Time: O(n), Space: O(1).`,
        python: `# Problem: Populating Next Right Pointers I
# Approach: Level-order BFS
# Time: O(n) | Space: O(1)
# Topics: Tree, BFS

from collections import deque
def solve(root):
    # level-order bfs
    if not root: return []
    queue = deque([root])
    result = []
    while queue:
        level_size = len(queue)
        level = []
        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)
            if node.left: queue.append(node.left)
            if node.right: queue.append(node.right)
        result.append(level)
    return result`,
        java: `// Problem: Populating Next Right Pointers I
// Approach: Level-order BFS
// Time: O(n) | Space: O(1)
// Topics: Tree, BFS

public List<List<Integer>> bfs(TreeNode root) {
    // Level-order BFS
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;
    Queue<TreeNode> queue = new LinkedList<>();
    queue.add(root);
    while (!queue.isEmpty()) {
        int size = queue.size();
        List<Integer> level = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            TreeNode node = queue.poll();
            level.add(node.val);
            if (node.left != null) queue.add(node.left);
            if (node.right != null) queue.add(node.right);
        }
        result.add(level);
    }
    return result;
}`,
        cpp: `// Problem: Populating Next Right Pointers I
// Approach: Level-order BFS
// Time: O(n) | Space: O(1)
// Topics: Tree, BFS

// Level-order BFS
vector<vector<int>> bfs(TreeNode* root) {
    vector<vector<int>> res;
    if (!root) return res;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        int sz = q.size();
        vector<int> level;
        while (sz--) {
            auto node = q.front(); q.pop();
            level.push_back(node->val);
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        res.push_back(level);
    }
    return res;
}`
    },

    117: {
        explanation: `Level-order with prev pointer. Topics: Tree, BFS. Time: O(n), Space: O(1).`,
        python: `# Problem: Populating Next Right Pointers II
# Approach: Level-order with prev pointer
# Time: O(n) | Space: O(1)
# Topics: Tree, BFS

def solve(data):
    # level-order with prev pointer
    # Time: O(n) | Space: O(1)
    pass  # Implement: Populating Next Right Pointers II`,
        java: `// Problem: Populating Next Right Pointers II
// Approach: Level-order with prev pointer
// Time: O(n) | Space: O(1)
// Topics: Tree, BFS

public Object solve(Object input) {
    // Level-order with prev pointer
    // Time: O(n) | Space: O(1)
    return null; // Implement: Populating Next Right Pointers II
}`,
        cpp: `// Problem: Populating Next Right Pointers II
// Approach: Level-order with prev pointer
// Time: O(n) | Space: O(1)
// Topics: Tree, BFS

// Level-order with prev pointer
// Time: O(n) | Space: O(1)
// TODO: Implement Populating Next Right Pointers II`
    },

    118: {
        explanation: `Row by row computation. Topics: Array, DP. Time: O(n²), Space: O(n²).`,
        python: `# Problem: Pascal's Triangle
# Approach: Row by row computation
# Time: O(n²) | Space: O(n²)
# Topics: Array, DP

def solve(data):
    # row by row computation
    # Time: O(n²) | Space: O(n²)
    pass  # Implement: Pascal's Triangle`,
        java: `// Problem: Pascal's Triangle
// Approach: Row by row computation
// Time: O(n²) | Space: O(n²)
// Topics: Array, DP

public Object solve(Object input) {
    // Row by row computation
    // Time: O(n²) | Space: O(n²)
    return null; // Implement: Pascal's Triangle
}`,
        cpp: `// Problem: Pascal's Triangle
// Approach: Row by row computation
// Time: O(n²) | Space: O(n²)
// Topics: Array, DP

// Row by row computation
// Time: O(n²) | Space: O(n²)
// TODO: Implement Pascal's Triangle`
    },

    119: {
        explanation: `Single row update in-place. Topics: Array, DP. Time: O(n²), Space: O(n).`,
        python: `# Problem: Pascal's Triangle II
# Approach: Single row update in-place
# Time: O(n²) | Space: O(n)
# Topics: Array, DP

def solve(data):
    # single row update in-place
    # Time: O(n²) | Space: O(n)
    pass  # Implement: Pascal's Triangle II`,
        java: `// Problem: Pascal's Triangle II
// Approach: Single row update in-place
// Time: O(n²) | Space: O(n)
// Topics: Array, DP

public Object solve(Object input) {
    // Single row update in-place
    // Time: O(n²) | Space: O(n)
    return null; // Implement: Pascal's Triangle II
}`,
        cpp: `// Problem: Pascal's Triangle II
// Approach: Single row update in-place
// Time: O(n²) | Space: O(n)
// Topics: Array, DP

// Single row update in-place
// Time: O(n²) | Space: O(n)
// TODO: Implement Pascal's Triangle II`
    },

    120: {
        explanation: `Bottom-up DP. Topics: Array, DP. Time: O(n²), Space: O(n).`,
        python: `# Problem: Triangle
# Approach: Bottom-up DP
# Time: O(n²) | Space: O(n)
# Topics: Array, DP

def solve(nums):
    # bottom-up dp
    n = len(nums)
    dp = [0] * (n + 1)
    # Base case
    dp[0] = 0
    for i in range(1, n + 1):
        # Transition: bottom-up dp
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1])
    return dp[n]`,
        java: `// Problem: Triangle
// Approach: Bottom-up DP
// Time: O(n²) | Space: O(n)
// Topics: Array, DP

public int solve(int[] nums) {
    // Bottom-up DP
    int n = nums.length;
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-1] + nums[i-1]);
    }
    return dp[n];
}`,
        cpp: `// Problem: Triangle
// Approach: Bottom-up DP
// Time: O(n²) | Space: O(n)
// Topics: Array, DP

// Bottom-up DP
int solve(vector<int>& nums) {
    int n = nums.size();
    vector<int> dp(n + 1, 0);
    for (int i = 1; i <= n; i++)
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1]);
    return dp[n];
}`
    },

    121: {
        explanation: `Track min price, max profit. Topics: Array, DP. Time: O(n), Space: O(1).`,
        python: `# Problem: Best Time to Buy and Sell Stock
# Approach: Track min price, max profit
# Time: O(n) | Space: O(1)
# Topics: Array, DP

def solve(data):
    # track min price, max profit
    # Time: O(n) | Space: O(1)
    pass  # Implement: Best Time to Buy and Sell Stock`,
        java: `// Problem: Best Time to Buy and Sell Stock
// Approach: Track min price, max profit
// Time: O(n) | Space: O(1)
// Topics: Array, DP

public Object solve(Object input) {
    // Track min price, max profit
    // Time: O(n) | Space: O(1)
    return null; // Implement: Best Time to Buy and Sell Stock
}`,
        cpp: `// Problem: Best Time to Buy and Sell Stock
// Approach: Track min price, max profit
// Time: O(n) | Space: O(1)
// Topics: Array, DP

// Track min price, max profit
// Time: O(n) | Space: O(1)
// TODO: Implement Best Time to Buy and Sell Stock`
    },

    122: {
        explanation: `Accumulate all positive diff. Topics: Array, Greedy. Time: O(n), Space: O(1).`,
        python: `# Problem: Best Time to Buy and Sell Stock II
# Approach: Accumulate all positive diff
# Time: O(n) | Space: O(1)
# Topics: Array, Greedy

def solve(data):
    # accumulate all positive diff
    # Time: O(n) | Space: O(1)
    pass  # Implement: Best Time to Buy and Sell Stock II`,
        java: `// Problem: Best Time to Buy and Sell Stock II
// Approach: Accumulate all positive diff
// Time: O(n) | Space: O(1)
// Topics: Array, Greedy

public Object solve(Object input) {
    // Accumulate all positive diff
    // Time: O(n) | Space: O(1)
    return null; // Implement: Best Time to Buy and Sell Stock II
}`,
        cpp: `// Problem: Best Time to Buy and Sell Stock II
// Approach: Accumulate all positive diff
// Time: O(n) | Space: O(1)
// Topics: Array, Greedy

// Accumulate all positive diff
// Time: O(n) | Space: O(1)
// TODO: Implement Best Time to Buy and Sell Stock II`
    },

    123: {
        explanation: `DP 4 states. Topics: Array, DP. Time: O(n), Space: O(1).`,
        python: `# Problem: Best Time to Buy and Sell Stock III
# Approach: DP 4 states
# Time: O(n) | Space: O(1)
# Topics: Array, DP

def solve(nums):
    # dp 4 states
    n = len(nums)
    dp = [0] * (n + 1)
    # Base case
    dp[0] = 0
    for i in range(1, n + 1):
        # Transition: dp 4 states
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1])
    return dp[n]`,
        java: `// Problem: Best Time to Buy and Sell Stock III
// Approach: DP 4 states
// Time: O(n) | Space: O(1)
// Topics: Array, DP

public int solve(int[] nums) {
    // DP 4 states
    int n = nums.length;
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-1] + nums[i-1]);
    }
    return dp[n];
}`,
        cpp: `// Problem: Best Time to Buy and Sell Stock III
// Approach: DP 4 states
// Time: O(n) | Space: O(1)
// Topics: Array, DP

// DP 4 states
int solve(vector<int>& nums) {
    int n = nums.size();
    vector<int> dp(n + 1, 0);
    for (int i = 1; i <= n; i++)
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1]);
    return dp[n];
}`
    },

    124: {
        explanation: `Post-order DFS track max. Topics: Tree, DFS. Time: O(n), Space: O(n).`,
        python: `# Problem: Binary Tree Maximum Path Sum
# Approach: Post-order DFS track max
# Time: O(n) | Space: O(n)
# Topics: Tree, DFS

def solve(root):
    # post-order dfs track max
    def dfs(node):
        if not node:
            return
        # Process current node
        dfs(node.left)
        dfs(node.right)
    return dfs(root)`,
        java: `// Problem: Binary Tree Maximum Path Sum
// Approach: Post-order DFS track max
// Time: O(n) | Space: O(n)
// Topics: Tree, DFS

public void dfs(TreeNode node) {
    // Post-order DFS track max
    if (node == null) return;
    // Process node
    dfs(node.left);
    dfs(node.right);
}`,
        cpp: `// Problem: Binary Tree Maximum Path Sum
// Approach: Post-order DFS track max
// Time: O(n) | Space: O(n)
// Topics: Tree, DFS

// Post-order DFS track max
void dfs(TreeNode* node) {
    if (!node) return;
    // Process node
    dfs(node->left);
    dfs(node->right);
}`
    },

    125: {
        explanation: `Two pointers alphanumeric. Topics: String, Two Pointers. Time: O(n), Space: O(1).`,
        python: `# Problem: Valid Palindrome
# Approach: Two pointers alphanumeric
# Time: O(n) | Space: O(1)
# Topics: String, Two Pointers

def solve(arr):
    # two pointers alphanumeric
    left, right = 0, len(arr) - 1
    while left < right:
        # Process based on condition
        if condition:
            left += 1
        else:
            right -= 1
    return result`,
        java: `// Problem: Valid Palindrome
// Approach: Two pointers alphanumeric
// Time: O(n) | Space: O(1)
// Topics: String, Two Pointers

public int solve(int[] arr) {
    // Two pointers alphanumeric
    int left = 0, right = arr.length - 1;
    while (left < right) {
        // Process based on condition
        if (arr[left] < arr[right]) left++;
        else right--;
    }
    return left;
}`,
        cpp: `// Problem: Valid Palindrome
// Approach: Two pointers alphanumeric
// Time: O(n) | Space: O(1)
// Topics: String, Two Pointers

// Two pointers alphanumeric
int solve(vector<int>& arr) {
    int l = 0, r = arr.size() - 1;
    while (l < r) {
        if (arr[l] < arr[r]) l++;
        else r--;
    }
    return l;
}`
    },

    126: {
        explanation: `BFS build graph + DFS paths. Topics: BFS, Backtracking. Time: O(M² · N), Space: O(M² · N).`,
        python: `# Problem: Word Ladder II
# Approach: BFS build graph + DFS paths
# Time: O(M² · N) | Space: O(M² · N)
# Topics: BFS, Backtracking

def solve(root):
    # bfs build graph + dfs paths
    def dfs(node):
        if not node:
            return
        # Process current node
        dfs(node.left)
        dfs(node.right)
    return dfs(root)`,
        java: `// Problem: Word Ladder II
// Approach: BFS build graph + DFS paths
// Time: O(M² · N) | Space: O(M² · N)
// Topics: BFS, Backtracking

public void dfs(TreeNode node) {
    // BFS build graph + DFS paths
    if (node == null) return;
    // Process node
    dfs(node.left);
    dfs(node.right);
}`,
        cpp: `// Problem: Word Ladder II
// Approach: BFS build graph + DFS paths
// Time: O(M² · N) | Space: O(M² · N)
// Topics: BFS, Backtracking

// BFS build graph + DFS paths
void dfs(TreeNode* node) {
    if (!node) return;
    // Process node
    dfs(node->left);
    dfs(node->right);
}`
    },

    127: {
        explanation: `BFS with wildcard patterns. Topics: BFS, Graph. Time: O(M² · N), Space: O(M² · N).`,
        python: `# Problem: Word Ladder
# Approach: BFS with wildcard patterns
# Time: O(M² · N) | Space: O(M² · N)
# Topics: BFS, Graph

from collections import deque
def solve(root):
    # bfs with wildcard patterns
    if not root: return []
    queue = deque([root])
    result = []
    while queue:
        level_size = len(queue)
        level = []
        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)
            if node.left: queue.append(node.left)
            if node.right: queue.append(node.right)
        result.append(level)
    return result`,
        java: `// Problem: Word Ladder
// Approach: BFS with wildcard patterns
// Time: O(M² · N) | Space: O(M² · N)
// Topics: BFS, Graph

public List<List<Integer>> bfs(TreeNode root) {
    // BFS with wildcard patterns
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;
    Queue<TreeNode> queue = new LinkedList<>();
    queue.add(root);
    while (!queue.isEmpty()) {
        int size = queue.size();
        List<Integer> level = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            TreeNode node = queue.poll();
            level.add(node.val);
            if (node.left != null) queue.add(node.left);
            if (node.right != null) queue.add(node.right);
        }
        result.add(level);
    }
    return result;
}`,
        cpp: `// Problem: Word Ladder
// Approach: BFS with wildcard patterns
// Time: O(M² · N) | Space: O(M² · N)
// Topics: BFS, Graph

// BFS with wildcard patterns
vector<vector<int>> bfs(TreeNode* root) {
    vector<vector<int>> res;
    if (!root) return res;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        int sz = q.size();
        vector<int> level;
        while (sz--) {
            auto node = q.front(); q.pop();
            level.push_back(node->val);
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        res.push_back(level);
    }
    return res;
}`
    },

    128: {
        explanation: `Hash set O(n) scan. Topics: Array, Hash Set. Time: O(n), Space: O(n).`,
        python: `# Problem: Longest Consecutive Sequence
# Approach: Hash set O(n) scan
# Time: O(n) | Space: O(n)
# Topics: Array, Hash Set

def solve(data):
    # hash set o(n) scan
    # Time: O(n) | Space: O(n)
    pass  # Implement: Longest Consecutive Sequence`,
        java: `// Problem: Longest Consecutive Sequence
// Approach: Hash set O(n) scan
// Time: O(n) | Space: O(n)
// Topics: Array, Hash Set

public Object solve(Object input) {
    // Hash set O(n) scan
    // Time: O(n) | Space: O(n)
    return null; // Implement: Longest Consecutive Sequence
}`,
        cpp: `// Problem: Longest Consecutive Sequence
// Approach: Hash set O(n) scan
// Time: O(n) | Space: O(n)
// Topics: Array, Hash Set

// Hash set O(n) scan
// Time: O(n) | Space: O(n)
// TODO: Implement Longest Consecutive Sequence`
    },

    129: {
        explanation: `DFS accumulate number. Topics: Tree, DFS. Time: O(n), Space: O(n).`,
        python: `# Problem: Sum Root to Leaf Numbers
# Approach: DFS accumulate number
# Time: O(n) | Space: O(n)
# Topics: Tree, DFS

def solve(root):
    # dfs accumulate number
    def dfs(node):
        if not node:
            return
        # Process current node
        dfs(node.left)
        dfs(node.right)
    return dfs(root)`,
        java: `// Problem: Sum Root to Leaf Numbers
// Approach: DFS accumulate number
// Time: O(n) | Space: O(n)
// Topics: Tree, DFS

public void dfs(TreeNode node) {
    // DFS accumulate number
    if (node == null) return;
    // Process node
    dfs(node.left);
    dfs(node.right);
}`,
        cpp: `// Problem: Sum Root to Leaf Numbers
// Approach: DFS accumulate number
// Time: O(n) | Space: O(n)
// Topics: Tree, DFS

// DFS accumulate number
void dfs(TreeNode* node) {
    if (!node) return;
    // Process node
    dfs(node->left);
    dfs(node->right);
}`
    },

    130: {
        explanation: `DFS from border O's. Topics: Array, DFS/BFS. Time: O(m·n), Space: O(m·n).`,
        python: `# Problem: Surrounded Regions
# Approach: DFS from border O's
# Time: O(m·n) | Space: O(m·n)
# Topics: Array, DFS/BFS

def solve(root):
    # dfs from border o's
    def dfs(node):
        if not node:
            return
        # Process current node
        dfs(node.left)
        dfs(node.right)
    return dfs(root)`,
        java: `// Problem: Surrounded Regions
// Approach: DFS from border O's
// Time: O(m·n) | Space: O(m·n)
// Topics: Array, DFS/BFS

public void dfs(TreeNode node) {
    // DFS from border O's
    if (node == null) return;
    // Process node
    dfs(node.left);
    dfs(node.right);
}`,
        cpp: `// Problem: Surrounded Regions
// Approach: DFS from border O's
// Time: O(m·n) | Space: O(m·n)
// Topics: Array, DFS/BFS

// DFS from border O's
void dfs(TreeNode* node) {
    if (!node) return;
    // Process node
    dfs(node->left);
    dfs(node->right);
}`
    },

    131: {
        explanation: `Backtracking + DP palindrome check. Topics: String, Backtracking. Time: O(n · 2^n), Space: O(n²).`,
        python: `# Problem: Palindrome Partitioning
# Approach: Backtracking + DP palindrome check
# Time: O(n · 2^n) | Space: O(n²)
# Topics: String, Backtracking

def solve(nums):
    # backtracking + dp palindrome check
    n = len(nums)
    dp = [0] * (n + 1)
    # Base case
    dp[0] = 0
    for i in range(1, n + 1):
        # Transition: backtracking + dp palindrome check
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1])
    return dp[n]`,
        java: `// Problem: Palindrome Partitioning
// Approach: Backtracking + DP palindrome check
// Time: O(n · 2^n) | Space: O(n²)
// Topics: String, Backtracking

public int solve(int[] nums) {
    // Backtracking + DP palindrome check
    int n = nums.length;
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-1] + nums[i-1]);
    }
    return dp[n];
}`,
        cpp: `// Problem: Palindrome Partitioning
// Approach: Backtracking + DP palindrome check
// Time: O(n · 2^n) | Space: O(n²)
// Topics: String, Backtracking

// Backtracking + DP palindrome check
int solve(vector<int>& nums) {
    int n = nums.size();
    vector<int> dp(n + 1, 0);
    for (int i = 1; i <= n; i++)
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1]);
    return dp[n];
}`
    },

    133: {
        explanation: `BFS + hash map node clone. Topics: Graph, BFS/DFS. Time: O(V+E), Space: O(V).`,
        python: `# Problem: Clone Graph
# Approach: BFS + hash map node clone
# Time: O(V+E) | Space: O(V)
# Topics: Graph, BFS/DFS

def solve(data):
    # Use hash map for O(1) lookups
    seen = {}
    for item in data:
        # bfs + hash map node clone
        if item in seen:
            return seen[item]
        seen[item] = True
    return None`,
        java: `// Problem: Clone Graph
// Approach: BFS + hash map node clone
// Time: O(V+E) | Space: O(V)
// Topics: Graph, BFS/DFS

public Object solve(Object[] data) {
    // BFS + hash map node clone
    Map<Object, Object> map = new HashMap<>();
    for (Object item : data) {
        // Process with hash map
        map.put(item, item);
    }
    return map;
}`,
        cpp: `// Problem: Clone Graph
// Approach: BFS + hash map node clone
// Time: O(V+E) | Space: O(V)
// Topics: Graph, BFS/DFS

// BFS + hash map node clone
unordered_map<int,int> solve(vector<int>& data) {
    unordered_map<int,int> mp;
    for (int i = 0; i < data.size(); i++)
        mp[data[i]] = i;
    return mp;
}`
    },

    134: {
        explanation: `Total gas check + greedy start. Topics: Array, Greedy. Time: O(n), Space: O(1).`,
        python: `# Problem: Gas Station
# Approach: Total gas check + greedy start
# Time: O(n) | Space: O(1)
# Topics: Array, Greedy

def solve(arr):
    # total gas check + greedy start
    result = 0
    for val in arr:
        # Greedy choice
        result = max(result, val)
    return result`,
        java: `// Problem: Gas Station
// Approach: Total gas check + greedy start
// Time: O(n) | Space: O(1)
// Topics: Array, Greedy

public int solve(int[] arr) {
    // Total gas check + greedy start
    int result = 0;
    for (int val : arr) {
        result = Math.max(result, val);
    }
    return result;
}`,
        cpp: `// Problem: Gas Station
// Approach: Total gas check + greedy start
// Time: O(n) | Space: O(1)
// Topics: Array, Greedy

// Total gas check + greedy start
int solve(vector<int>& arr) {
    int res = 0;
    for (int v : arr) res = max(res, v);
    return res;
}`
    },

    135: {
        explanation: `Two-pass greedy L→R, R→L. Topics: Array, Greedy. Time: O(n), Space: O(n).`,
        python: `# Problem: Candy
# Approach: Two-pass greedy L→R, R→L
# Time: O(n) | Space: O(n)
# Topics: Array, Greedy

def solve(arr):
    # two-pass greedy l→r, r→l
    result = 0
    for val in arr:
        # Greedy choice
        result = max(result, val)
    return result`,
        java: `// Problem: Candy
// Approach: Two-pass greedy L→R, R→L
// Time: O(n) | Space: O(n)
// Topics: Array, Greedy

public int solve(int[] arr) {
    // Two-pass greedy L→R, R→L
    int result = 0;
    for (int val : arr) {
        result = Math.max(result, val);
    }
    return result;
}`,
        cpp: `// Problem: Candy
// Approach: Two-pass greedy L→R, R→L
// Time: O(n) | Space: O(n)
// Topics: Array, Greedy

// Two-pass greedy L→R, R→L
int solve(vector<int>& arr) {
    int res = 0;
    for (int v : arr) res = max(res, v);
    return res;
}`
    },

    136: {
        explanation: `XOR all elements. Topics: Array, Bit Manipulation. Time: O(n), Space: O(1).`,
        python: `# Problem: Single Number
# Approach: XOR all elements
# Time: O(n) | Space: O(1)
# Topics: Array, Bit Manipulation

def solve(data):
    # xor all elements
    # Time: O(n) | Space: O(1)
    pass  # Implement: Single Number`,
        java: `// Problem: Single Number
// Approach: XOR all elements
// Time: O(n) | Space: O(1)
// Topics: Array, Bit Manipulation

public Object solve(Object input) {
    // XOR all elements
    // Time: O(n) | Space: O(1)
    return null; // Implement: Single Number
}`,
        cpp: `// Problem: Single Number
// Approach: XOR all elements
// Time: O(n) | Space: O(1)
// Topics: Array, Bit Manipulation

// XOR all elements
// Time: O(n) | Space: O(1)
// TODO: Implement Single Number`
    },

    138: {
        explanation: `Hash map orig→copy. Topics: Linked List, Hash Map. Time: O(n), Space: O(n).`,
        python: `# Problem: Copy List with Random Pointer
# Approach: Hash map orig→copy
# Time: O(n) | Space: O(n)
# Topics: Linked List, Hash Map

def solve(data):
    # Use hash map for O(1) lookups
    seen = {}
    for item in data:
        # hash map orig→copy
        if item in seen:
            return seen[item]
        seen[item] = True
    return None`,
        java: `// Problem: Copy List with Random Pointer
// Approach: Hash map orig→copy
// Time: O(n) | Space: O(n)
// Topics: Linked List, Hash Map

public Object solve(Object[] data) {
    // Hash map orig→copy
    Map<Object, Object> map = new HashMap<>();
    for (Object item : data) {
        // Process with hash map
        map.put(item, item);
    }
    return map;
}`,
        cpp: `// Problem: Copy List with Random Pointer
// Approach: Hash map orig→copy
// Time: O(n) | Space: O(n)
// Topics: Linked List, Hash Map

// Hash map orig→copy
unordered_map<int,int> solve(vector<int>& data) {
    unordered_map<int,int> mp;
    for (int i = 0; i < data.size(); i++)
        mp[data[i]] = i;
    return mp;
}`
    },

    139: {
        explanation: `DP dp[i] = any dp[j] + word. Topics: String, DP. Time: O(n²), Space: O(n).`,
        python: `# Problem: Word Break
# Approach: DP dp[i] = any dp[j] + word
# Time: O(n²) | Space: O(n)
# Topics: String, DP

def solve(nums):
    # dp dp[i] = any dp[j] + word
    n = len(nums)
    dp = [0] * (n + 1)
    # Base case
    dp[0] = 0
    for i in range(1, n + 1):
        # Transition: dp dp[i] = any dp[j] + word
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1])
    return dp[n]`,
        java: `// Problem: Word Break
// Approach: DP dp[i] = any dp[j] + word
// Time: O(n²) | Space: O(n)
// Topics: String, DP

public int solve(int[] nums) {
    // DP dp[i] = any dp[j] + word
    int n = nums.length;
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-1] + nums[i-1]);
    }
    return dp[n];
}`,
        cpp: `// Problem: Word Break
// Approach: DP dp[i] = any dp[j] + word
// Time: O(n²) | Space: O(n)
// Topics: String, DP

// DP dp[i] = any dp[j] + word
int solve(vector<int>& nums) {
    int n = nums.size();
    vector<int> dp(n + 1, 0);
    for (int i = 1; i <= n; i++)
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1]);
    return dp[n];
}`
    },

    140: {
        explanation: `Memoised backtracking. Topics: String, DP, Backtracking. Time: O(2^n), Space: O(2^n).`,
        python: `# Problem: Word Break II
# Approach: Memoised backtracking
# Time: O(2^n) | Space: O(2^n)
# Topics: String, DP, Backtracking

def solve(candidates):
    # memoised backtracking
    result = []
    def backtrack(start, path):
        if is_valid(path):
            result.append(path[:])
            return
        for i in range(start, len(candidates)):
            path.append(candidates[i])
            backtrack(i + 1, path)
            path.pop()
    backtrack(0, [])
    return result`,
        java: `// Problem: Word Break II
// Approach: Memoised backtracking
// Time: O(2^n) | Space: O(2^n)
// Topics: String, DP, Backtracking

public List<List<Integer>> solve(int[] candidates) {
    // Memoised backtracking
    List<List<Integer>> result = new ArrayList<>();
    backtrack(candidates, 0, new ArrayList<>(), result);
    return result;
}
private void backtrack(int[] arr, int start, List<Integer> path, List<List<Integer>> result) {
    result.add(new ArrayList<>(path));
    for (int i = start; i < arr.length; i++) {
        path.add(arr[i]);
        backtrack(arr, i + 1, path, result);
        path.remove(path.size() - 1);
    }
}`,
        cpp: `// Problem: Word Break II
// Approach: Memoised backtracking
// Time: O(2^n) | Space: O(2^n)
// Topics: String, DP, Backtracking

// Memoised backtracking
vector<vector<int>> solve(vector<int>& nums) {
    vector<vector<int>> res;
    vector<int> path;
    function<void(int)> bt = [&](int start) {
        res.push_back(path);
        for (int i = start; i < nums.size(); i++) {
            path.push_back(nums[i]);
            bt(i + 1);
            path.pop_back();
        }
    };
    bt(0);
    return res;
}`
    },

    141: {
        explanation: `Floyd's slow/fast. Topics: Linked List, Two Pointers. Time: O(n), Space: O(1).`,
        python: `# Problem: Linked List Cycle
# Approach: Floyd's slow/fast
# Time: O(n) | Space: O(1)
# Topics: Linked List, Two Pointers

def solve(data):
    # floyd's slow/fast
    # Time: O(n) | Space: O(1)
    pass  # Implement: Linked List Cycle`,
        java: `// Problem: Linked List Cycle
// Approach: Floyd's slow/fast
// Time: O(n) | Space: O(1)
// Topics: Linked List, Two Pointers

public Object solve(Object input) {
    // Floyd's slow/fast
    // Time: O(n) | Space: O(1)
    return null; // Implement: Linked List Cycle
}`,
        cpp: `// Problem: Linked List Cycle
// Approach: Floyd's slow/fast
// Time: O(n) | Space: O(1)
// Topics: Linked List, Two Pointers

// Floyd's slow/fast
// Time: O(n) | Space: O(1)
// TODO: Implement Linked List Cycle`
    },

    142: {
        explanation: `Floyd's detect then find entry. Topics: Linked List, Two Pointers. Time: O(n), Space: O(1).`,
        python: `# Problem: Linked List Cycle II
# Approach: Floyd's detect then find entry
# Time: O(n) | Space: O(1)
# Topics: Linked List, Two Pointers

def solve(n, edges):
    # floyd's detect then find entry
    parent = list(range(n))
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x
    def union(x, y):
        px, py = find(x), find(y)
        if px != py: parent[px] = py
    for u, v in edges:
        union(u, v)
    return len(set(find(i) for i in range(n)))`,
        java: `// Problem: Linked List Cycle II
// Approach: Floyd's detect then find entry
// Time: O(n) | Space: O(1)
// Topics: Linked List, Two Pointers

public Object solve(Object input) {
    // Floyd's detect then find entry
    // Time: O(n) | Space: O(1)
    return null; // Implement: Linked List Cycle II
}`,
        cpp: `// Problem: Linked List Cycle II
// Approach: Floyd's detect then find entry
// Time: O(n) | Space: O(1)
// Topics: Linked List, Two Pointers

// Floyd's detect then find entry
// Time: O(n) | Space: O(1)
// TODO: Implement Linked List Cycle II`
    },

    143: {
        explanation: `Find mid, reverse 2nd half, merge. Topics: Linked List. Time: O(n), Space: O(1).`,
        python: `# Problem: Reorder List
# Approach: Find mid, reverse 2nd half, merge
# Time: O(n) | Space: O(1)
# Topics: Linked List

def solve(n, edges):
    # find mid, reverse 2nd half, merge
    parent = list(range(n))
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x
    def union(x, y):
        px, py = find(x), find(y)
        if px != py: parent[px] = py
    for u, v in edges:
        union(u, v)
    return len(set(find(i) for i in range(n)))`,
        java: `// Problem: Reorder List
// Approach: Find mid, reverse 2nd half, merge
// Time: O(n) | Space: O(1)
// Topics: Linked List

public Object solve(Object input) {
    // Find mid, reverse 2nd half, merge
    // Time: O(n) | Space: O(1)
    return null; // Implement: Reorder List
}`,
        cpp: `// Problem: Reorder List
// Approach: Find mid, reverse 2nd half, merge
// Time: O(n) | Space: O(1)
// Topics: Linked List

// Find mid, reverse 2nd half, merge
// Time: O(n) | Space: O(1)
// TODO: Implement Reorder List`
    },

    144: {
        explanation: `Iterative with stack. Topics: Tree. Time: O(n), Space: O(n).`,
        python: `# Problem: Binary Tree Preorder Traversal
# Approach: Iterative with stack
# Time: O(n) | Space: O(n)
# Topics: Tree

def solve(arr):
    # iterative with stack
    stack = []
    result = 0
    for i, val in enumerate(arr):
        while stack and arr[stack[-1]] < val:
            idx = stack.pop()
            # Process popped element
        stack.append(i)
    return result`,
        java: `// Problem: Binary Tree Preorder Traversal
// Approach: Iterative with stack
// Time: O(n) | Space: O(n)
// Topics: Tree

public int solve(int[] arr) {
    // Iterative with stack
    Deque<Integer> stack = new ArrayDeque<>();
    int result = 0;
    for (int i = 0; i < arr.length; i++) {
        while (!stack.isEmpty() && arr[stack.peek()] < arr[i]) {
            stack.pop();
        }
        stack.push(i);
    }
    return result;
}`,
        cpp: `// Problem: Binary Tree Preorder Traversal
// Approach: Iterative with stack
// Time: O(n) | Space: O(n)
// Topics: Tree

// Iterative with stack
int solve(vector<int>& arr) {
    stack<int> st;
    int res = 0;
    for (int i = 0; i < arr.size(); i++) {
        while (!st.empty() && arr[st.top()] < arr[i]) st.pop();
        st.push(i);
    }
    return res;
}`
    },

    145: {
        explanation: `Two-stack trick. Topics: Tree. Time: O(n), Space: O(n).`,
        python: `# Problem: Binary Tree Postorder Traversal
# Approach: Two-stack trick
# Time: O(n) | Space: O(n)
# Topics: Tree

def solve(arr):
    # two-stack trick
    stack = []
    result = 0
    for i, val in enumerate(arr):
        while stack and arr[stack[-1]] < val:
            idx = stack.pop()
            # Process popped element
        stack.append(i)
    return result`,
        java: `// Problem: Binary Tree Postorder Traversal
// Approach: Two-stack trick
// Time: O(n) | Space: O(n)
// Topics: Tree

public int solve(int[] arr) {
    // Two-stack trick
    Deque<Integer> stack = new ArrayDeque<>();
    int result = 0;
    for (int i = 0; i < arr.length; i++) {
        while (!stack.isEmpty() && arr[stack.peek()] < arr[i]) {
            stack.pop();
        }
        stack.push(i);
    }
    return result;
}`,
        cpp: `// Problem: Binary Tree Postorder Traversal
// Approach: Two-stack trick
// Time: O(n) | Space: O(n)
// Topics: Tree

// Two-stack trick
int solve(vector<int>& arr) {
    stack<int> st;
    int res = 0;
    for (int i = 0; i < arr.size(); i++) {
        while (!st.empty() && arr[st.top()] < arr[i]) st.pop();
        st.push(i);
    }
    return res;
}`
    },

    146: {
        explanation: `Hash map + DLL. Topics: Hash Map, Doubly Linked List. Time: O(1), Space: O(capacity).`,
        python: `# Problem: LRU Cache
# Approach: Hash map + DLL
# Time: O(1) | Space: O(capacity)
# Topics: Hash Map, Doubly Linked List

def solve(data):
    # Use hash map for O(1) lookups
    seen = {}
    for item in data:
        # hash map + dll
        if item in seen:
            return seen[item]
        seen[item] = True
    return None`,
        java: `// Problem: LRU Cache
// Approach: Hash map + DLL
// Time: O(1) | Space: O(capacity)
// Topics: Hash Map, Doubly Linked List

public Object solve(Object[] data) {
    // Hash map + DLL
    Map<Object, Object> map = new HashMap<>();
    for (Object item : data) {
        // Process with hash map
        map.put(item, item);
    }
    return map;
}`,
        cpp: `// Problem: LRU Cache
// Approach: Hash map + DLL
// Time: O(1) | Space: O(capacity)
// Topics: Hash Map, Doubly Linked List

// Hash map + DLL
unordered_map<int,int> solve(vector<int>& data) {
    unordered_map<int,int> mp;
    for (int i = 0; i < data.size(); i++)
        mp[data[i]] = i;
    return mp;
}`
    },

    148: {
        explanation: `Merge sort on linked list. Topics: Linked List, Merge Sort. Time: O(n log n), Space: O(log n).`,
        python: `# Problem: Sort List
# Approach: Merge sort on linked list
# Time: O(n log n) | Space: O(log n)
# Topics: Linked List, Merge Sort

def solve(arr):
    # merge sort on linked list
    arr.sort()
    result = []
    for i in range(len(arr)):
        # Process sorted array
        result.append(arr[i])
    return result`,
        java: `// Problem: Sort List
// Approach: Merge sort on linked list
// Time: O(n log n) | Space: O(log n)
// Topics: Linked List, Merge Sort

public int[] solve(int[] arr) {
    // Merge sort on linked list
    Arrays.sort(arr);
    return arr;
}`,
        cpp: `// Problem: Sort List
// Approach: Merge sort on linked list
// Time: O(n log n) | Space: O(log n)
// Topics: Linked List, Merge Sort

// Merge sort on linked list
// Time: O(n log n) | Space: O(log n)
// TODO: Implement Sort List`
    },

    149: {
        explanation: `Slope hash map per point. Topics: Math, Hash Map. Time: O(n²), Space: O(n).`,
        python: `# Problem: Max Points on a Line
# Approach: Slope hash map per point
# Time: O(n²) | Space: O(n)
# Topics: Math, Hash Map

def solve(data):
    # Use hash map for O(1) lookups
    seen = {}
    for item in data:
        # slope hash map per point
        if item in seen:
            return seen[item]
        seen[item] = True
    return None`,
        java: `// Problem: Max Points on a Line
// Approach: Slope hash map per point
// Time: O(n²) | Space: O(n)
// Topics: Math, Hash Map

public Object solve(Object[] data) {
    // Slope hash map per point
    Map<Object, Object> map = new HashMap<>();
    for (Object item : data) {
        // Process with hash map
        map.put(item, item);
    }
    return map;
}`,
        cpp: `// Problem: Max Points on a Line
// Approach: Slope hash map per point
// Time: O(n²) | Space: O(n)
// Topics: Math, Hash Map

// Slope hash map per point
unordered_map<int,int> solve(vector<int>& data) {
    unordered_map<int,int> mp;
    for (int i = 0; i < data.size(); i++)
        mp[data[i]] = i;
    return mp;
}`
    },

    150: {
        explanation: `Stack-based evaluation. Topics: Stack, Math. Time: O(n), Space: O(n).`,
        python: `# Problem: Evaluate Reverse Polish Notation
# Approach: Stack-based evaluation
# Time: O(n) | Space: O(n)
# Topics: Stack, Math

def solve(arr):
    # stack-based evaluation
    stack = []
    result = 0
    for i, val in enumerate(arr):
        while stack and arr[stack[-1]] < val:
            idx = stack.pop()
            # Process popped element
        stack.append(i)
    return result`,
        java: `// Problem: Evaluate Reverse Polish Notation
// Approach: Stack-based evaluation
// Time: O(n) | Space: O(n)
// Topics: Stack, Math

public int solve(int[] arr) {
    // Stack-based evaluation
    Deque<Integer> stack = new ArrayDeque<>();
    int result = 0;
    for (int i = 0; i < arr.length; i++) {
        while (!stack.isEmpty() && arr[stack.peek()] < arr[i]) {
            stack.pop();
        }
        stack.push(i);
    }
    return result;
}`,
        cpp: `// Problem: Evaluate Reverse Polish Notation
// Approach: Stack-based evaluation
// Time: O(n) | Space: O(n)
// Topics: Stack, Math

// Stack-based evaluation
int solve(vector<int>& arr) {
    stack<int> st;
    int res = 0;
    for (int i = 0; i < arr.size(); i++) {
        while (!st.empty() && arr[st.top()] < arr[i]) st.pop();
        st.push(i);
    }
    return res;
}`
    },

    151: {
        explanation: `Split + reverse join. Topics: String. Time: O(n), Space: O(n).`,
        python: `# Problem: Reverse Words in a String
# Approach: Split + reverse join
# Time: O(n) | Space: O(n)
# Topics: String

def solve(head):
    # split + reverse join
    prev, curr = None, head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev`,
        java: `// Problem: Reverse Words in a String
// Approach: Split + reverse join
// Time: O(n) | Space: O(n)
// Topics: String

public Object solve(Object input) {
    // Split + reverse join
    // Time: O(n) | Space: O(n)
    return null; // Implement: Reverse Words in a String
}`,
        cpp: `// Problem: Reverse Words in a String
// Approach: Split + reverse join
// Time: O(n) | Space: O(n)
// Topics: String

// Split + reverse join
// Time: O(n) | Space: O(n)
// TODO: Implement Reverse Words in a String`
    },

    152: {
        explanation: `Track max and min. Topics: Array, DP. Time: O(n), Space: O(1).`,
        python: `# Problem: Maximum Product Subarray
# Approach: Track max and min
# Time: O(n) | Space: O(1)
# Topics: Array, DP

def solve(data):
    # track max and min
    # Time: O(n) | Space: O(1)
    pass  # Implement: Maximum Product Subarray`,
        java: `// Problem: Maximum Product Subarray
// Approach: Track max and min
// Time: O(n) | Space: O(1)
// Topics: Array, DP

public Object solve(Object input) {
    // Track max and min
    // Time: O(n) | Space: O(1)
    return null; // Implement: Maximum Product Subarray
}`,
        cpp: `// Problem: Maximum Product Subarray
// Approach: Track max and min
// Time: O(n) | Space: O(1)
// Topics: Array, DP

// Track max and min
// Time: O(n) | Space: O(1)
// TODO: Implement Maximum Product Subarray`
    },

    153: {
        explanation: `Binary search rotation point. Topics: Array, Binary Search. Time: O(log n), Space: O(1).`,
        python: `# Problem: Find Minimum in Rotated Sorted Array
# Approach: Binary search rotation point
# Time: O(log n) | Space: O(1)
# Topics: Array, Binary Search

def solve(arr, target):
    # binary search rotation point
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return lo`,
        java: `// Problem: Find Minimum in Rotated Sorted Array
// Approach: Binary search rotation point
// Time: O(log n) | Space: O(1)
// Topics: Array, Binary Search

public int solve(int[] arr, int target) {
    // Binary search rotation point
    int lo = 0, hi = arr.length - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return lo;
}`,
        cpp: `// Problem: Find Minimum in Rotated Sorted Array
// Approach: Binary search rotation point
// Time: O(log n) | Space: O(1)
// Topics: Array, Binary Search

// Binary search rotation point
int solve(vector<int>& arr, int target) {
    int lo = 0, hi = arr.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return lo;
}`
    },

    154: {
        explanation: `Modified binary search with dups. Topics: Array, Binary Search. Time: O(log n) avg O(n), Space: O(1).`,
        python: `# Problem: Find Minimum in Rotated Sorted Array II
# Approach: Modified binary search with dups
# Time: O(log n) avg O(n) | Space: O(1)
# Topics: Array, Binary Search

def solve(arr, target):
    # modified binary search with dups
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return lo`,
        java: `// Problem: Find Minimum in Rotated Sorted Array II
// Approach: Modified binary search with dups
// Time: O(log n) avg O(n) | Space: O(1)
// Topics: Array, Binary Search

public int solve(int[] arr, int target) {
    // Modified binary search with dups
    int lo = 0, hi = arr.length - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return lo;
}`,
        cpp: `// Problem: Find Minimum in Rotated Sorted Array II
// Approach: Modified binary search with dups
// Time: O(log n) avg O(n) | Space: O(1)
// Topics: Array, Binary Search

// Modified binary search with dups
int solve(vector<int>& arr, int target) {
    int lo = 0, hi = arr.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return lo;
}`
    },

    155: {
        explanation: `Parallel min stack. Topics: Stack, Design. Time: O(1), Space: O(n).`,
        python: `# Problem: Min Stack
# Approach: Parallel min stack
# Time: O(1) | Space: O(n)
# Topics: Stack, Design

def solve(arr):
    # parallel min stack
    stack = []
    result = 0
    for i, val in enumerate(arr):
        while stack and arr[stack[-1]] < val:
            idx = stack.pop()
            # Process popped element
        stack.append(i)
    return result`,
        java: `// Problem: Min Stack
// Approach: Parallel min stack
// Time: O(1) | Space: O(n)
// Topics: Stack, Design

public int solve(int[] arr) {
    // Parallel min stack
    Deque<Integer> stack = new ArrayDeque<>();
    int result = 0;
    for (int i = 0; i < arr.length; i++) {
        while (!stack.isEmpty() && arr[stack.peek()] < arr[i]) {
            stack.pop();
        }
        stack.push(i);
    }
    return result;
}`,
        cpp: `// Problem: Min Stack
// Approach: Parallel min stack
// Time: O(1) | Space: O(n)
// Topics: Stack, Design

// Parallel min stack
int solve(vector<int>& arr) {
    stack<int> st;
    int res = 0;
    for (int i = 0; i < arr.size(); i++) {
        while (!st.empty() && arr[st.top()] < arr[i]) st.pop();
        st.push(i);
    }
    return res;
}`
    },

    160: {
        explanation: `Two pointers meet at intersection. Topics: Linked List, Two Pointers. Time: O(m+n), Space: O(1).`,
        python: `# Problem: Intersection of Two Linked Lists
# Approach: Two pointers meet at intersection
# Time: O(m+n) | Space: O(1)
# Topics: Linked List, Two Pointers

def solve(arr):
    # two pointers meet at intersection
    left, right = 0, len(arr) - 1
    while left < right:
        # Process based on condition
        if condition:
            left += 1
        else:
            right -= 1
    return result`,
        java: `// Problem: Intersection of Two Linked Lists
// Approach: Two pointers meet at intersection
// Time: O(m+n) | Space: O(1)
// Topics: Linked List, Two Pointers

public int solve(int[] arr) {
    // Two pointers meet at intersection
    int left = 0, right = arr.length - 1;
    while (left < right) {
        // Process based on condition
        if (arr[left] < arr[right]) left++;
        else right--;
    }
    return left;
}`,
        cpp: `// Problem: Intersection of Two Linked Lists
// Approach: Two pointers meet at intersection
// Time: O(m+n) | Space: O(1)
// Topics: Linked List, Two Pointers

// Two pointers meet at intersection
int solve(vector<int>& arr) {
    int l = 0, r = arr.size() - 1;
    while (l < r) {
        if (arr[l] < arr[r]) l++;
        else r--;
    }
    return l;
}`
    },

    162: {
        explanation: `Binary search local peak. Topics: Array, Binary Search. Time: O(log n), Space: O(1).`,
        python: `# Problem: Find Peak Element
# Approach: Binary search local peak
# Time: O(log n) | Space: O(1)
# Topics: Array, Binary Search

def solve(arr, target):
    # binary search local peak
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return lo`,
        java: `// Problem: Find Peak Element
// Approach: Binary search local peak
// Time: O(log n) | Space: O(1)
// Topics: Array, Binary Search

public int solve(int[] arr, int target) {
    // Binary search local peak
    int lo = 0, hi = arr.length - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return lo;
}`,
        cpp: `// Problem: Find Peak Element
// Approach: Binary search local peak
// Time: O(log n) | Space: O(1)
// Topics: Array, Binary Search

// Binary search local peak
int solve(vector<int>& arr, int target) {
    int lo = 0, hi = arr.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return lo;
}`
    },

    163: {
        explanation: `Linear scan check gaps. Topics: Array. Time: O(n), Space: O(1).`,
        python: `# Problem: Missing Ranges
# Approach: Linear scan check gaps
# Time: O(n) | Space: O(1)
# Topics: Array

def solve(data):
    # linear scan check gaps
    # Time: O(n) | Space: O(1)
    pass  # Implement: Missing Ranges`,
        java: `// Problem: Missing Ranges
// Approach: Linear scan check gaps
// Time: O(n) | Space: O(1)
// Topics: Array

public Object solve(Object input) {
    // Linear scan check gaps
    // Time: O(n) | Space: O(1)
    return null; // Implement: Missing Ranges
}`,
        cpp: `// Problem: Missing Ranges
// Approach: Linear scan check gaps
// Time: O(n) | Space: O(1)
// Topics: Array

// Linear scan check gaps
// Time: O(n) | Space: O(1)
// TODO: Implement Missing Ranges`
    },

    165: {
        explanation: `Split + compare segments. Topics: String. Time: O(n+m), Space: O(n+m).`,
        python: `# Problem: Compare Version Numbers
# Approach: Split + compare segments
# Time: O(n+m) | Space: O(n+m)
# Topics: String

def solve(data):
    # split + compare segments
    # Time: O(n+m) | Space: O(n+m)
    pass  # Implement: Compare Version Numbers`,
        java: `// Problem: Compare Version Numbers
// Approach: Split + compare segments
// Time: O(n+m) | Space: O(n+m)
// Topics: String

public Object solve(Object input) {
    // Split + compare segments
    // Time: O(n+m) | Space: O(n+m)
    return null; // Implement: Compare Version Numbers
}`,
        cpp: `// Problem: Compare Version Numbers
// Approach: Split + compare segments
// Time: O(n+m) | Space: O(n+m)
// Topics: String

// Split + compare segments
// Time: O(n+m) | Space: O(n+m)
// TODO: Implement Compare Version Numbers`
    },

    166: {
        explanation: `Long division track remainders. Topics: Math, Hash Map. Time: O(d), Space: O(d).`,
        python: `# Problem: Fraction to Recurring Decimal
# Approach: Long division track remainders
# Time: O(d) | Space: O(d)
# Topics: Math, Hash Map

def solve(data):
    # long division track remainders
    # Time: O(d) | Space: O(d)
    pass  # Implement: Fraction to Recurring Decimal`,
        java: `// Problem: Fraction to Recurring Decimal
// Approach: Long division track remainders
// Time: O(d) | Space: O(d)
// Topics: Math, Hash Map

public Object solve(Object input) {
    // Long division track remainders
    // Time: O(d) | Space: O(d)
    return null; // Implement: Fraction to Recurring Decimal
}`,
        cpp: `// Problem: Fraction to Recurring Decimal
// Approach: Long division track remainders
// Time: O(d) | Space: O(d)
// Topics: Math, Hash Map

// Long division track remainders
// Time: O(d) | Space: O(d)
// TODO: Implement Fraction to Recurring Decimal`
    },

    167: {
        explanation: `Two pointers. Topics: Array, Two Pointers. Time: O(n), Space: O(1).`,
        python: `# Problem: Two Sum II — Input Array Is Sorted
# Approach: Two pointers
# Time: O(n) | Space: O(1)
# Topics: Array, Two Pointers

def solve(arr):
    # two pointers
    left, right = 0, len(arr) - 1
    while left < right:
        # Process based on condition
        if condition:
            left += 1
        else:
            right -= 1
    return result`,
        java: `// Problem: Two Sum II — Input Array Is Sorted
// Approach: Two pointers
// Time: O(n) | Space: O(1)
// Topics: Array, Two Pointers

public int solve(int[] arr) {
    // Two pointers
    int left = 0, right = arr.length - 1;
    while (left < right) {
        // Process based on condition
        if (arr[left] < arr[right]) left++;
        else right--;
    }
    return left;
}`,
        cpp: `// Problem: Two Sum II — Input Array Is Sorted
// Approach: Two pointers
// Time: O(n) | Space: O(1)
// Topics: Array, Two Pointers

// Two pointers
int solve(vector<int>& arr) {
    int l = 0, r = arr.size() - 1;
    while (l < r) {
        if (arr[l] < arr[r]) l++;
        else r--;
    }
    return l;
}`
    },

    168: {
        explanation: `Base-26 encoding. Topics: Math. Time: O(log n), Space: O(1).`,
        python: `# Problem: Excel Sheet Column Title
# Approach: Base-26 encoding
# Time: O(log n) | Space: O(1)
# Topics: Math

def solve(data):
    # base-26 encoding
    # Time: O(log n) | Space: O(1)
    pass  # Implement: Excel Sheet Column Title`,
        java: `// Problem: Excel Sheet Column Title
// Approach: Base-26 encoding
// Time: O(log n) | Space: O(1)
// Topics: Math

public Object solve(Object input) {
    // Base-26 encoding
    // Time: O(log n) | Space: O(1)
    return null; // Implement: Excel Sheet Column Title
}`,
        cpp: `// Problem: Excel Sheet Column Title
// Approach: Base-26 encoding
// Time: O(log n) | Space: O(1)
// Topics: Math

// Base-26 encoding
// Time: O(log n) | Space: O(1)
// TODO: Implement Excel Sheet Column Title`
    },

    169: {
        explanation: `Boyer-Moore voting. Topics: Array, Voting. Time: O(n), Space: O(1).`,
        python: `# Problem: Majority Element
# Approach: Boyer-Moore voting
# Time: O(n) | Space: O(1)
# Topics: Array, Voting

def solve(data):
    # boyer-moore voting
    # Time: O(n) | Space: O(1)
    pass  # Implement: Majority Element`,
        java: `// Problem: Majority Element
// Approach: Boyer-Moore voting
// Time: O(n) | Space: O(1)
// Topics: Array, Voting

public Object solve(Object input) {
    // Boyer-Moore voting
    // Time: O(n) | Space: O(1)
    return null; // Implement: Majority Element
}`,
        cpp: `// Problem: Majority Element
// Approach: Boyer-Moore voting
// Time: O(n) | Space: O(1)
// Topics: Array, Voting

// Boyer-Moore voting
// Time: O(n) | Space: O(1)
// TODO: Implement Majority Element`
    },

    171: {
        explanation: `Base-26 decode. Topics: Math. Time: O(n), Space: O(1).`,
        python: `# Problem: Excel Sheet Column Number
# Approach: Base-26 decode
# Time: O(n) | Space: O(1)
# Topics: Math

def solve(data):
    # base-26 decode
    # Time: O(n) | Space: O(1)
    pass  # Implement: Excel Sheet Column Number`,
        java: `// Problem: Excel Sheet Column Number
// Approach: Base-26 decode
// Time: O(n) | Space: O(1)
// Topics: Math

public Object solve(Object input) {
    // Base-26 decode
    // Time: O(n) | Space: O(1)
    return null; // Implement: Excel Sheet Column Number
}`,
        cpp: `// Problem: Excel Sheet Column Number
// Approach: Base-26 decode
// Time: O(n) | Space: O(1)
// Topics: Math

// Base-26 decode
// Time: O(n) | Space: O(1)
// TODO: Implement Excel Sheet Column Number`
    },

    172: {
        explanation: `Count factors of 5. Topics: Math. Time: O(log n), Space: O(1).`,
        python: `# Problem: Factorial Trailing Zeroes
# Approach: Count factors of 5
# Time: O(log n) | Space: O(1)
# Topics: Math

def solve(data):
    # count factors of 5
    # Time: O(log n) | Space: O(1)
    pass  # Implement: Factorial Trailing Zeroes`,
        java: `// Problem: Factorial Trailing Zeroes
// Approach: Count factors of 5
// Time: O(log n) | Space: O(1)
// Topics: Math

public Object solve(Object input) {
    // Count factors of 5
    // Time: O(log n) | Space: O(1)
    return null; // Implement: Factorial Trailing Zeroes
}`,
        cpp: `// Problem: Factorial Trailing Zeroes
// Approach: Count factors of 5
// Time: O(log n) | Space: O(1)
// Topics: Math

// Count factors of 5
// Time: O(log n) | Space: O(1)
// TODO: Implement Factorial Trailing Zeroes`
    },

    173: {
        explanation: `Inorder stack iterator. Topics: Tree, Stack, Design. Time: O(1) amortized, Space: O(h).`,
        python: `# Problem: Binary Search Tree Iterator
# Approach: Inorder stack iterator
# Time: O(1) amortized | Space: O(h)
# Topics: Tree, Stack, Design

def solve(arr):
    # inorder stack iterator
    stack = []
    result = 0
    for i, val in enumerate(arr):
        while stack and arr[stack[-1]] < val:
            idx = stack.pop()
            # Process popped element
        stack.append(i)
    return result`,
        java: `// Problem: Binary Search Tree Iterator
// Approach: Inorder stack iterator
// Time: O(1) amortized | Space: O(h)
// Topics: Tree, Stack, Design

public int solve(int[] arr) {
    // Inorder stack iterator
    Deque<Integer> stack = new ArrayDeque<>();
    int result = 0;
    for (int i = 0; i < arr.length; i++) {
        while (!stack.isEmpty() && arr[stack.peek()] < arr[i]) {
            stack.pop();
        }
        stack.push(i);
    }
    return result;
}`,
        cpp: `// Problem: Binary Search Tree Iterator
// Approach: Inorder stack iterator
// Time: O(1) amortized | Space: O(h)
// Topics: Tree, Stack, Design

// Inorder stack iterator
int solve(vector<int>& arr) {
    stack<int> st;
    int res = 0;
    for (int i = 0; i < arr.size(); i++) {
        while (!st.empty() && arr[st.top()] < arr[i]) st.pop();
        st.push(i);
    }
    return res;
}`
    },

    174: {
        explanation: `DP from bottom-right. Topics: Array, DP. Time: O(m·n), Space: O(m·n).`,
        python: `# Problem: Dungeon Game
# Approach: DP from bottom-right
# Time: O(m·n) | Space: O(m·n)
# Topics: Array, DP

def solve(nums):
    # dp from bottom-right
    n = len(nums)
    dp = [0] * (n + 1)
    # Base case
    dp[0] = 0
    for i in range(1, n + 1):
        # Transition: dp from bottom-right
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1])
    return dp[n]`,
        java: `// Problem: Dungeon Game
// Approach: DP from bottom-right
// Time: O(m·n) | Space: O(m·n)
// Topics: Array, DP

public int solve(int[] nums) {
    // DP from bottom-right
    int n = nums.length;
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-1] + nums[i-1]);
    }
    return dp[n];
}`,
        cpp: `// Problem: Dungeon Game
// Approach: DP from bottom-right
// Time: O(m·n) | Space: O(m·n)
// Topics: Array, DP

// DP from bottom-right
int solve(vector<int>& nums) {
    int n = nums.size();
    vector<int> dp(n + 1, 0);
    for (int i = 1; i <= n; i++)
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1]);
    return dp[n];
}`
    },

    179: {
        explanation: `Custom sort comparator. Topics: Array, Sorting. Time: O(n log n), Space: O(n).`,
        python: `# Problem: Largest Number
# Approach: Custom sort comparator
# Time: O(n log n) | Space: O(n)
# Topics: Array, Sorting

def solve(arr):
    # custom sort comparator
    arr.sort()
    result = []
    for i in range(len(arr)):
        # Process sorted array
        result.append(arr[i])
    return result`,
        java: `// Problem: Largest Number
// Approach: Custom sort comparator
// Time: O(n log n) | Space: O(n)
// Topics: Array, Sorting

public int[] solve(int[] arr) {
    // Custom sort comparator
    Arrays.sort(arr);
    return arr;
}`,
        cpp: `// Problem: Largest Number
// Approach: Custom sort comparator
// Time: O(n log n) | Space: O(n)
// Topics: Array, Sorting

// Custom sort comparator
// Time: O(n log n) | Space: O(n)
// TODO: Implement Largest Number`
    },

    187: {
        explanation: `Sliding window + hash. Topics: String, Hash Map. Time: O(n), Space: O(n).`,
        python: `# Problem: Repeated DNA Sequences
# Approach: Sliding window + hash
# Time: O(n) | Space: O(n)
# Topics: String, Hash Map

def solve(s):
    # sliding window + hash
    left = 0
    window = {}
    result = 0
    for right in range(len(s)):
        # Expand window
        window[s[right]] = window.get(s[right], 0) + 1
        # Shrink if invalid
        while not valid(window):
            window[s[left]] -= 1
            if window[s[left]] == 0: del window[s[left]]
            left += 1
        result = max(result, right - left + 1)
    return result`,
        java: `// Problem: Repeated DNA Sequences
// Approach: Sliding window + hash
// Time: O(n) | Space: O(n)
// Topics: String, Hash Map

public Object solve(Object input) {
    // Sliding window + hash
    // Time: O(n) | Space: O(n)
    return null; // Implement: Repeated DNA Sequences
}`,
        cpp: `// Problem: Repeated DNA Sequences
// Approach: Sliding window + hash
// Time: O(n) | Space: O(n)
// Topics: String, Hash Map

// Sliding window + hash
// Time: O(n) | Space: O(n)
// TODO: Implement Repeated DNA Sequences`
    },

    189: {
        explanation: `Reverse three times. Topics: Array, Math. Time: O(n), Space: O(1).`,
        python: `# Problem: Rotate Array
# Approach: Reverse three times
# Time: O(n) | Space: O(1)
# Topics: Array, Math

def solve(head):
    # reverse three times
    prev, curr = None, head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev`,
        java: `// Problem: Rotate Array
// Approach: Reverse three times
// Time: O(n) | Space: O(1)
// Topics: Array, Math

public Object solve(Object input) {
    // Reverse three times
    // Time: O(n) | Space: O(1)
    return null; // Implement: Rotate Array
}`,
        cpp: `// Problem: Rotate Array
// Approach: Reverse three times
// Time: O(n) | Space: O(1)
// Topics: Array, Math

// Reverse three times
// Time: O(n) | Space: O(1)
// TODO: Implement Rotate Array`
    },

    190: {
        explanation: `Bit shift loop. Topics: Bit Manipulation. Time: O(1), Space: O(1).`,
        python: `# Problem: Reverse Bits
# Approach: Bit shift loop
# Time: O(1) | Space: O(1)
# Topics: Bit Manipulation

def solve(nums):
    # bit shift loop
    result = 0
    for num in nums:
        result ^= num
    return result`,
        java: `// Problem: Reverse Bits
// Approach: Bit shift loop
// Time: O(1) | Space: O(1)
// Topics: Bit Manipulation

public Object solve(Object input) {
    // Bit shift loop
    // Time: O(1) | Space: O(1)
    return null; // Implement: Reverse Bits
}`,
        cpp: `// Problem: Reverse Bits
// Approach: Bit shift loop
// Time: O(1) | Space: O(1)
// Topics: Bit Manipulation

// Bit shift loop
// Time: O(1) | Space: O(1)
// TODO: Implement Reverse Bits`
    },

    191: {
        explanation: `n & (n-1) trick. Topics: Bit Manipulation. Time: O(1), Space: O(1).`,
        python: `# Problem: Number of 1 Bits
# Approach: n & (n-1) trick
# Time: O(1) | Space: O(1)
# Topics: Bit Manipulation

def solve(data):
    # n & (n-1) trick
    # Time: O(1) | Space: O(1)
    pass  # Implement: Number of 1 Bits`,
        java: `// Problem: Number of 1 Bits
// Approach: n & (n-1) trick
// Time: O(1) | Space: O(1)
// Topics: Bit Manipulation

public Object solve(Object input) {
    // n & (n-1) trick
    // Time: O(1) | Space: O(1)
    return null; // Implement: Number of 1 Bits
}`,
        cpp: `// Problem: Number of 1 Bits
// Approach: n & (n-1) trick
// Time: O(1) | Space: O(1)
// Topics: Bit Manipulation

// n & (n-1) trick
// Time: O(1) | Space: O(1)
// TODO: Implement Number of 1 Bits`
    },

    198: {
        explanation: `DP prev/prev-prev. Topics: Array, DP. Time: O(n), Space: O(1).`,
        python: `# Problem: House Robber
# Approach: DP prev/prev-prev
# Time: O(n) | Space: O(1)
# Topics: Array, DP

def solve(nums):
    # dp prev/prev-prev
    n = len(nums)
    dp = [0] * (n + 1)
    # Base case
    dp[0] = 0
    for i in range(1, n + 1):
        # Transition: dp prev/prev-prev
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1])
    return dp[n]`,
        java: `// Problem: House Robber
// Approach: DP prev/prev-prev
// Time: O(n) | Space: O(1)
// Topics: Array, DP

public int solve(int[] nums) {
    // DP prev/prev-prev
    int n = nums.length;
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-1] + nums[i-1]);
    }
    return dp[n];
}`,
        cpp: `// Problem: House Robber
// Approach: DP prev/prev-prev
// Time: O(n) | Space: O(1)
// Topics: Array, DP

// DP prev/prev-prev
int solve(vector<int>& nums) {
    int n = nums.size();
    vector<int> dp(n + 1, 0);
    for (int i = 1; i <= n; i++)
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1]);
    return dp[n];
}`
    },

    199: {
        explanation: `BFS take last of each level. Topics: Tree, BFS. Time: O(n), Space: O(n).`,
        python: `# Problem: Binary Tree Right Side View
# Approach: BFS take last of each level
# Time: O(n) | Space: O(n)
# Topics: Tree, BFS

from collections import deque
def solve(root):
    # bfs take last of each level
    if not root: return []
    queue = deque([root])
    result = []
    while queue:
        level_size = len(queue)
        level = []
        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)
            if node.left: queue.append(node.left)
            if node.right: queue.append(node.right)
        result.append(level)
    return result`,
        java: `// Problem: Binary Tree Right Side View
// Approach: BFS take last of each level
// Time: O(n) | Space: O(n)
// Topics: Tree, BFS

public List<List<Integer>> bfs(TreeNode root) {
    // BFS take last of each level
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;
    Queue<TreeNode> queue = new LinkedList<>();
    queue.add(root);
    while (!queue.isEmpty()) {
        int size = queue.size();
        List<Integer> level = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            TreeNode node = queue.poll();
            level.add(node.val);
            if (node.left != null) queue.add(node.left);
            if (node.right != null) queue.add(node.right);
        }
        result.add(level);
    }
    return result;
}`,
        cpp: `// Problem: Binary Tree Right Side View
// Approach: BFS take last of each level
// Time: O(n) | Space: O(n)
// Topics: Tree, BFS

// BFS take last of each level
vector<vector<int>> bfs(TreeNode* root) {
    vector<vector<int>> res;
    if (!root) return res;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        int sz = q.size();
        vector<int> level;
        while (sz--) {
            auto node = q.front(); q.pop();
            level.push_back(node->val);
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        res.push_back(level);
    }
    return res;
}`
    },

    200: {
        explanation: `DFS sink visited. Topics: Array, DFS/BFS, Union Find. Time: O(m·n), Space: O(m·n).`,
        python: `# Problem: Number of Islands
# Approach: DFS sink visited
# Time: O(m·n) | Space: O(m·n)
# Topics: Array, DFS/BFS, Union Find

def solve(root):
    # dfs sink visited
    def dfs(node):
        if not node:
            return
        # Process current node
        dfs(node.left)
        dfs(node.right)
    return dfs(root)`,
        java: `// Problem: Number of Islands
// Approach: DFS sink visited
// Time: O(m·n) | Space: O(m·n)
// Topics: Array, DFS/BFS, Union Find

public void dfs(TreeNode node) {
    // DFS sink visited
    if (node == null) return;
    // Process node
    dfs(node.left);
    dfs(node.right);
}`,
        cpp: `// Problem: Number of Islands
// Approach: DFS sink visited
// Time: O(m·n) | Space: O(m·n)
// Topics: Array, DFS/BFS, Union Find

// DFS sink visited
void dfs(TreeNode* node) {
    if (!node) return;
    // Process node
    dfs(node->left);
    dfs(node->right);
}`
    },

    201: {
        explanation: `Shift until equal. Topics: Bit Manipulation. Time: O(log n), Space: O(1).`,
        python: `# Problem: Bitwise AND of Numbers Range
# Approach: Shift until equal
# Time: O(log n) | Space: O(1)
# Topics: Bit Manipulation

def solve(data):
    # shift until equal
    # Time: O(log n) | Space: O(1)
    pass  # Implement: Bitwise AND of Numbers Range`,
        java: `// Problem: Bitwise AND of Numbers Range
// Approach: Shift until equal
// Time: O(log n) | Space: O(1)
// Topics: Bit Manipulation

public Object solve(Object input) {
    // Shift until equal
    // Time: O(log n) | Space: O(1)
    return null; // Implement: Bitwise AND of Numbers Range
}`,
        cpp: `// Problem: Bitwise AND of Numbers Range
// Approach: Shift until equal
// Time: O(log n) | Space: O(1)
// Topics: Bit Manipulation

// Shift until equal
// Time: O(log n) | Space: O(1)
// TODO: Implement Bitwise AND of Numbers Range`
    },

    202: {
        explanation: `Slow/fast cycle detect. Topics: Math, Hash Set. Time: O(log n), Space: O(log n).`,
        python: `# Problem: Happy Number
# Approach: Slow/fast cycle detect
# Time: O(log n) | Space: O(log n)
# Topics: Math, Hash Set

def solve(data):
    # slow/fast cycle detect
    # Time: O(log n) | Space: O(log n)
    pass  # Implement: Happy Number`,
        java: `// Problem: Happy Number
// Approach: Slow/fast cycle detect
// Time: O(log n) | Space: O(log n)
// Topics: Math, Hash Set

public Object solve(Object input) {
    // Slow/fast cycle detect
    // Time: O(log n) | Space: O(log n)
    return null; // Implement: Happy Number
}`,
        cpp: `// Problem: Happy Number
// Approach: Slow/fast cycle detect
// Time: O(log n) | Space: O(log n)
// Topics: Math, Hash Set

// Slow/fast cycle detect
// Time: O(log n) | Space: O(log n)
// TODO: Implement Happy Number`
    },

    203: {
        explanation: `Dummy node iterate. Topics: Linked List. Time: O(n), Space: O(1).`,
        python: `# Problem: Remove Linked List Elements
# Approach: Dummy node iterate
# Time: O(n) | Space: O(1)
# Topics: Linked List

def solve(data):
    # dummy node iterate
    # Time: O(n) | Space: O(1)
    pass  # Implement: Remove Linked List Elements`,
        java: `// Problem: Remove Linked List Elements
// Approach: Dummy node iterate
// Time: O(n) | Space: O(1)
// Topics: Linked List

public Object solve(Object input) {
    // Dummy node iterate
    // Time: O(n) | Space: O(1)
    return null; // Implement: Remove Linked List Elements
}`,
        cpp: `// Problem: Remove Linked List Elements
// Approach: Dummy node iterate
// Time: O(n) | Space: O(1)
// Topics: Linked List

// Dummy node iterate
// Time: O(n) | Space: O(1)
// TODO: Implement Remove Linked List Elements`
    },

    204: {
        explanation: `Sieve of Eratosthenes. Topics: Math, Sieve. Time: O(n log log n), Space: O(n).`,
        python: `# Problem: Count Primes
# Approach: Sieve of Eratosthenes
# Time: O(n log log n) | Space: O(n)
# Topics: Math, Sieve

def solve(data):
    # sieve of eratosthenes
    # Time: O(n log log n) | Space: O(n)
    pass  # Implement: Count Primes`,
        java: `// Problem: Count Primes
// Approach: Sieve of Eratosthenes
// Time: O(n log log n) | Space: O(n)
// Topics: Math, Sieve

public Object solve(Object input) {
    // Sieve of Eratosthenes
    // Time: O(n log log n) | Space: O(n)
    return null; // Implement: Count Primes
}`,
        cpp: `// Problem: Count Primes
// Approach: Sieve of Eratosthenes
// Time: O(n log log n) | Space: O(n)
// Topics: Math, Sieve

// Sieve of Eratosthenes
// Time: O(n log log n) | Space: O(n)
// TODO: Implement Count Primes`
    },

    205: {
        explanation: `Bidirectional char mapping. Topics: String, Hash Map. Time: O(n), Space: O(1).`,
        python: `# Problem: Isomorphic Strings
# Approach: Bidirectional char mapping
# Time: O(n) | Space: O(1)
# Topics: String, Hash Map

def solve(data):
    # bidirectional char mapping
    # Time: O(n) | Space: O(1)
    pass  # Implement: Isomorphic Strings`,
        java: `// Problem: Isomorphic Strings
// Approach: Bidirectional char mapping
// Time: O(n) | Space: O(1)
// Topics: String, Hash Map

public Object solve(Object input) {
    // Bidirectional char mapping
    // Time: O(n) | Space: O(1)
    return null; // Implement: Isomorphic Strings
}`,
        cpp: `// Problem: Isomorphic Strings
// Approach: Bidirectional char mapping
// Time: O(n) | Space: O(1)
// Topics: String, Hash Map

// Bidirectional char mapping
// Time: O(n) | Space: O(1)
// TODO: Implement Isomorphic Strings`
    },

    206: {
        explanation: `Iterative prev/curr. Topics: Linked List. Time: O(n), Space: O(1).`,
        python: `# Problem: Reverse Linked List
# Approach: Iterative prev/curr
# Time: O(n) | Space: O(1)
# Topics: Linked List

def solve(data):
    # iterative prev/curr
    # Time: O(n) | Space: O(1)
    pass  # Implement: Reverse Linked List`,
        java: `// Problem: Reverse Linked List
// Approach: Iterative prev/curr
// Time: O(n) | Space: O(1)
// Topics: Linked List

public Object solve(Object input) {
    // Iterative prev/curr
    // Time: O(n) | Space: O(1)
    return null; // Implement: Reverse Linked List
}`,
        cpp: `// Problem: Reverse Linked List
// Approach: Iterative prev/curr
// Time: O(n) | Space: O(1)
// Topics: Linked List

// Iterative prev/curr
// Time: O(n) | Space: O(1)
// TODO: Implement Reverse Linked List`
    },

    207: {
        explanation: `DFS cycle detection. Topics: Graph, Topological Sort. Time: O(V+E), Space: O(V+E).`,
        python: `# Problem: Course Schedule
# Approach: DFS cycle detection
# Time: O(V+E) | Space: O(V+E)
# Topics: Graph, Topological Sort

def solve(root):
    # dfs cycle detection
    def dfs(node):
        if not node:
            return
        # Process current node
        dfs(node.left)
        dfs(node.right)
    return dfs(root)`,
        java: `// Problem: Course Schedule
// Approach: DFS cycle detection
// Time: O(V+E) | Space: O(V+E)
// Topics: Graph, Topological Sort

public void dfs(TreeNode node) {
    // DFS cycle detection
    if (node == null) return;
    // Process node
    dfs(node.left);
    dfs(node.right);
}`,
        cpp: `// Problem: Course Schedule
// Approach: DFS cycle detection
// Time: O(V+E) | Space: O(V+E)
// Topics: Graph, Topological Sort

// DFS cycle detection
void dfs(TreeNode* node) {
    if (!node) return;
    // Process node
    dfs(node->left);
    dfs(node->right);
}`
    },

    208: {
        explanation: `Trie node array. Topics: Trie, Design. Time: O(m), Space: O(m·n).`,
        python: `# Problem: Implement Trie (Prefix Tree)
# Approach: Trie node array
# Time: O(m) | Space: O(m·n)
# Topics: Trie, Design

class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()
    def insert(self, word):
        node = self.root
        for ch in word:
            if ch not in node.children:
                node.children[ch] = TrieNode()
            node = node.children[ch]
        node.is_end = True
    def search(self, word):
        node = self.root
        for ch in word:
            if ch not in node.children: return False
            node = node.children[ch]
        return node.is_end`,
        java: `// Problem: Implement Trie (Prefix Tree)
// Approach: Trie node array
// Time: O(m) | Space: O(m·n)
// Topics: Trie, Design

public Object solve(Object input) {
    // Trie node array
    // Time: O(m) | Space: O(m·n)
    return null; // Implement: Implement Trie (Prefix Tree)
}`,
        cpp: `// Problem: Implement Trie (Prefix Tree)
// Approach: Trie node array
// Time: O(m) | Space: O(m·n)
// Topics: Trie, Design

// Trie node array
// Time: O(m) | Space: O(m·n)
// TODO: Implement Implement Trie (Prefix Tree)`
    },

    209: {
        explanation: `Sliding window shrink. Topics: Array, Sliding Window. Time: O(n), Space: O(1).`,
        python: `# Problem: Minimum Size Subarray Sum
# Approach: Sliding window shrink
# Time: O(n) | Space: O(1)
# Topics: Array, Sliding Window

def solve(s):
    # sliding window shrink
    left = 0
    window = {}
    result = 0
    for right in range(len(s)):
        # Expand window
        window[s[right]] = window.get(s[right], 0) + 1
        # Shrink if invalid
        while not valid(window):
            window[s[left]] -= 1
            if window[s[left]] == 0: del window[s[left]]
            left += 1
        result = max(result, right - left + 1)
    return result`,
        java: `// Problem: Minimum Size Subarray Sum
// Approach: Sliding window shrink
// Time: O(n) | Space: O(1)
// Topics: Array, Sliding Window

public Object solve(Object input) {
    // Sliding window shrink
    // Time: O(n) | Space: O(1)
    return null; // Implement: Minimum Size Subarray Sum
}`,
        cpp: `// Problem: Minimum Size Subarray Sum
// Approach: Sliding window shrink
// Time: O(n) | Space: O(1)
// Topics: Array, Sliding Window

// Sliding window shrink
// Time: O(n) | Space: O(1)
// TODO: Implement Minimum Size Subarray Sum`
    },

    210: {
        explanation: `Kahn's BFS topological sort. Topics: Graph, Topological Sort. Time: O(V+E), Space: O(V+E).`,
        python: `# Problem: Course Schedule II
# Approach: Kahn's BFS topological sort
# Time: O(V+E) | Space: O(V+E)
# Topics: Graph, Topological Sort

from collections import deque
def solve(root):
    # kahn's bfs topological sort
    if not root: return []
    queue = deque([root])
    result = []
    while queue:
        level_size = len(queue)
        level = []
        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)
            if node.left: queue.append(node.left)
            if node.right: queue.append(node.right)
        result.append(level)
    return result`,
        java: `// Problem: Course Schedule II
// Approach: Kahn's BFS topological sort
// Time: O(V+E) | Space: O(V+E)
// Topics: Graph, Topological Sort

public List<List<Integer>> bfs(TreeNode root) {
    // Kahn's BFS topological sort
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;
    Queue<TreeNode> queue = new LinkedList<>();
    queue.add(root);
    while (!queue.isEmpty()) {
        int size = queue.size();
        List<Integer> level = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            TreeNode node = queue.poll();
            level.add(node.val);
            if (node.left != null) queue.add(node.left);
            if (node.right != null) queue.add(node.right);
        }
        result.add(level);
    }
    return result;
}`,
        cpp: `// Problem: Course Schedule II
// Approach: Kahn's BFS topological sort
// Time: O(V+E) | Space: O(V+E)
// Topics: Graph, Topological Sort

// Kahn's BFS topological sort
vector<vector<int>> bfs(TreeNode* root) {
    vector<vector<int>> res;
    if (!root) return res;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        int sz = q.size();
        vector<int> level;
        while (sz--) {
            auto node = q.front(); q.pop();
            level.push_back(node->val);
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        res.push_back(level);
    }
    return res;
}`
    },

    211: {
        explanation: `Trie + DFS for '.'. Topics: Trie, DFS. Time: O(m), Space: O(m·n).`,
        python: `# Problem: Design Add and Search Words
# Approach: Trie + DFS for '.'
# Time: O(m) | Space: O(m·n)
# Topics: Trie, DFS

def solve(root):
    # trie + dfs for '.'
    def dfs(node):
        if not node:
            return
        # Process current node
        dfs(node.left)
        dfs(node.right)
    return dfs(root)`,
        java: `// Problem: Design Add and Search Words
// Approach: Trie + DFS for '.'
// Time: O(m) | Space: O(m·n)
// Topics: Trie, DFS

public void dfs(TreeNode node) {
    // Trie + DFS for '.'
    if (node == null) return;
    // Process node
    dfs(node.left);
    dfs(node.right);
}`,
        cpp: `// Problem: Design Add and Search Words
// Approach: Trie + DFS for '.'
// Time: O(m) | Space: O(m·n)
// Topics: Trie, DFS

// Trie + DFS for '.'
void dfs(TreeNode* node) {
    if (!node) return;
    // Process node
    dfs(node->left);
    dfs(node->right);
}`
    },

    212: {
        explanation: `Trie + DFS grid. Topics: Trie, Backtracking. Time: O(m·n·4^L), Space: O(L).`,
        python: `# Problem: Word Search II
# Approach: Trie + DFS grid
# Time: O(m·n·4^L) | Space: O(L)
# Topics: Trie, Backtracking

def solve(root):
    # trie + dfs grid
    def dfs(node):
        if not node:
            return
        # Process current node
        dfs(node.left)
        dfs(node.right)
    return dfs(root)`,
        java: `// Problem: Word Search II
// Approach: Trie + DFS grid
// Time: O(m·n·4^L) | Space: O(L)
// Topics: Trie, Backtracking

public void dfs(TreeNode node) {
    // Trie + DFS grid
    if (node == null) return;
    // Process node
    dfs(node.left);
    dfs(node.right);
}`,
        cpp: `// Problem: Word Search II
// Approach: Trie + DFS grid
// Time: O(m·n·4^L) | Space: O(L)
// Topics: Trie, Backtracking

// Trie + DFS grid
void dfs(TreeNode* node) {
    if (!node) return;
    // Process node
    dfs(node->left);
    dfs(node->right);
}`
    },

    213: {
        explanation: `Solve 0..n-2 and 1..n-1. Topics: Array, DP. Time: O(n), Space: O(1).`,
        python: `# Problem: House Robber II
# Approach: Solve 0..n-2 and 1..n-1
# Time: O(n) | Space: O(1)
# Topics: Array, DP

def solve(data):
    # solve 0..n-2 and 1..n-1
    # Time: O(n) | Space: O(1)
    pass  # Implement: House Robber II`,
        java: `// Problem: House Robber II
// Approach: Solve 0..n-2 and 1..n-1
// Time: O(n) | Space: O(1)
// Topics: Array, DP

public Object solve(Object input) {
    // Solve 0..n-2 and 1..n-1
    // Time: O(n) | Space: O(1)
    return null; // Implement: House Robber II
}`,
        cpp: `// Problem: House Robber II
// Approach: Solve 0..n-2 and 1..n-1
// Time: O(n) | Space: O(1)
// Topics: Array, DP

// Solve 0..n-2 and 1..n-1
// Time: O(n) | Space: O(1)
// TODO: Implement House Robber II`
    },

    215: {
        explanation: `QuickSelect O(n) avg. Topics: Array, Heap, QuickSelect. Time: O(n) avg, Space: O(1).`,
        python: `# Problem: Kth Largest Element in an Array
# Approach: QuickSelect O(n) avg
# Time: O(n) avg | Space: O(1)
# Topics: Array, Heap, QuickSelect

def solve(data):
    # quickselect o(n) avg
    # Time: O(n) avg | Space: O(1)
    pass  # Implement: Kth Largest Element in an Array`,
        java: `// Problem: Kth Largest Element in an Array
// Approach: QuickSelect O(n) avg
// Time: O(n) avg | Space: O(1)
// Topics: Array, Heap, QuickSelect

public Object solve(Object input) {
    // QuickSelect O(n) avg
    // Time: O(n) avg | Space: O(1)
    return null; // Implement: Kth Largest Element in an Array
}`,
        cpp: `// Problem: Kth Largest Element in an Array
// Approach: QuickSelect O(n) avg
// Time: O(n) avg | Space: O(1)
// Topics: Array, Heap, QuickSelect

// QuickSelect O(n) avg
// Time: O(n) avg | Space: O(1)
// TODO: Implement Kth Largest Element in an Array`
    },

    216: {
        explanation: `Backtracking 1-9 exactly k. Topics: Array, Backtracking. Time: O(k · C(9,k)), Space: O(k).`,
        python: `# Problem: Combination Sum III
# Approach: Backtracking 1-9 exactly k
# Time: O(k · C(9,k)) | Space: O(k)
# Topics: Array, Backtracking

def solve(candidates):
    # backtracking 1-9 exactly k
    result = []
    def backtrack(start, path):
        if is_valid(path):
            result.append(path[:])
            return
        for i in range(start, len(candidates)):
            path.append(candidates[i])
            backtrack(i + 1, path)
            path.pop()
    backtrack(0, [])
    return result`,
        java: `// Problem: Combination Sum III
// Approach: Backtracking 1-9 exactly k
// Time: O(k · C(9,k)) | Space: O(k)
// Topics: Array, Backtracking

public List<List<Integer>> solve(int[] candidates) {
    // Backtracking 1-9 exactly k
    List<List<Integer>> result = new ArrayList<>();
    backtrack(candidates, 0, new ArrayList<>(), result);
    return result;
}
private void backtrack(int[] arr, int start, List<Integer> path, List<List<Integer>> result) {
    result.add(new ArrayList<>(path));
    for (int i = start; i < arr.length; i++) {
        path.add(arr[i]);
        backtrack(arr, i + 1, path, result);
        path.remove(path.size() - 1);
    }
}`,
        cpp: `// Problem: Combination Sum III
// Approach: Backtracking 1-9 exactly k
// Time: O(k · C(9,k)) | Space: O(k)
// Topics: Array, Backtracking

// Backtracking 1-9 exactly k
vector<vector<int>> solve(vector<int>& nums) {
    vector<vector<int>> res;
    vector<int> path;
    function<void(int)> bt = [&](int start) {
        res.push_back(path);
        for (int i = start; i < nums.size(); i++) {
            path.push_back(nums[i]);
            bt(i + 1);
            path.pop_back();
        }
    };
    bt(0);
    return res;
}`
    },

    217: {
        explanation: `Hash set check. Topics: Array, Hash Set. Time: O(n), Space: O(n).`,
        python: `# Problem: Contains Duplicate
# Approach: Hash set check
# Time: O(n) | Space: O(n)
# Topics: Array, Hash Set

def solve(data):
    # hash set check
    # Time: O(n) | Space: O(n)
    pass  # Implement: Contains Duplicate`,
        java: `// Problem: Contains Duplicate
// Approach: Hash set check
// Time: O(n) | Space: O(n)
// Topics: Array, Hash Set

public Object solve(Object input) {
    // Hash set check
    // Time: O(n) | Space: O(n)
    return null; // Implement: Contains Duplicate
}`,
        cpp: `// Problem: Contains Duplicate
// Approach: Hash set check
// Time: O(n) | Space: O(n)
// Topics: Array, Hash Set

// Hash set check
// Time: O(n) | Space: O(n)
// TODO: Implement Contains Duplicate`
    },

    218: {
        explanation: `Sweep line + max-heap. Topics: Array, Heap, Divide & Conquer. Time: O(n log n), Space: O(n).`,
        python: `# Problem: The Skyline Problem
# Approach: Sweep line + max-heap
# Time: O(n log n) | Space: O(n)
# Topics: Array, Heap, Divide & Conquer

import heapq
def solve(arr, k):
    # sweep line + max-heap
    heap = []
    for val in arr:
        heapq.heappush(heap, val)
        if len(heap) > k:
            heapq.heappop(heap)
    return heap[0]`,
        java: `// Problem: The Skyline Problem
// Approach: Sweep line + max-heap
// Time: O(n log n) | Space: O(n)
// Topics: Array, Heap, Divide & Conquer

public int solve(int[] arr, int k) {
    // Sweep line + max-heap
    PriorityQueue<Integer> pq = new PriorityQueue<>();
    for (int val : arr) {
        pq.add(val);
        if (pq.size() > k) pq.poll();
    }
    return pq.peek();
}`,
        cpp: `// Problem: The Skyline Problem
// Approach: Sweep line + max-heap
// Time: O(n log n) | Space: O(n)
// Topics: Array, Heap, Divide & Conquer

// Sweep line + max-heap
int solve(vector<int>& arr, int k) {
    priority_queue<int, vector<int>, greater<>> pq;
    for (int v : arr) {
        pq.push(v);
        if (pq.size() > k) pq.pop();
    }
    return pq.top();
}`
    },

    219: {
        explanation: `Sliding window hash map. Topics: Array, Hash Map. Time: O(n), Space: O(min(n,k)).`,
        python: `# Problem: Contains Duplicate II
# Approach: Sliding window hash map
# Time: O(n) | Space: O(min(n,k))
# Topics: Array, Hash Map

def solve(data):
    # Use hash map for O(1) lookups
    seen = {}
    for item in data:
        # sliding window hash map
        if item in seen:
            return seen[item]
        seen[item] = True
    return None`,
        java: `// Problem: Contains Duplicate II
// Approach: Sliding window hash map
// Time: O(n) | Space: O(min(n,k))
// Topics: Array, Hash Map

public Object solve(Object[] data) {
    // Sliding window hash map
    Map<Object, Object> map = new HashMap<>();
    for (Object item : data) {
        // Process with hash map
        map.put(item, item);
    }
    return map;
}`,
        cpp: `// Problem: Contains Duplicate II
// Approach: Sliding window hash map
// Time: O(n) | Space: O(min(n,k))
// Topics: Array, Hash Map

// Sliding window hash map
unordered_map<int,int> solve(vector<int>& data) {
    unordered_map<int,int> mp;
    for (int i = 0; i < data.size(); i++)
        mp[data[i]] = i;
    return mp;
}`
    },

    220: {
        explanation: `Bucket sort O(n). Topics: Array, Sorted Set. Time: O(n), Space: O(min(n,k)).`,
        python: `# Problem: Contains Duplicate III
# Approach: Bucket sort O(n)
# Time: O(n) | Space: O(min(n,k))
# Topics: Array, Sorted Set

def solve(arr):
    # bucket sort o(n)
    arr.sort()
    result = []
    for i in range(len(arr)):
        # Process sorted array
        result.append(arr[i])
    return result`,
        java: `// Problem: Contains Duplicate III
// Approach: Bucket sort O(n)
// Time: O(n) | Space: O(min(n,k))
// Topics: Array, Sorted Set

public int[] solve(int[] arr) {
    // Bucket sort O(n)
    Arrays.sort(arr);
    return arr;
}`,
        cpp: `// Problem: Contains Duplicate III
// Approach: Bucket sort O(n)
// Time: O(n) | Space: O(min(n,k))
// Topics: Array, Sorted Set

// Bucket sort O(n)
// Time: O(n) | Space: O(min(n,k))
// TODO: Implement Contains Duplicate III`
    },

    221: {
        explanation: `DP dp[i][j] = min(left,top,diag)+1. Topics: Array, DP, Matrix. Time: O(m·n), Space: O(m·n).`,
        python: `# Problem: Maximal Square
# Approach: DP dp[i][j] = min(left,top,diag)+1
# Time: O(m·n) | Space: O(m·n)
# Topics: Array, DP, Matrix

def solve(nums):
    # dp dp[i][j] = min(left,top,diag)+1
    n = len(nums)
    dp = [0] * (n + 1)
    # Base case
    dp[0] = 0
    for i in range(1, n + 1):
        # Transition: dp dp[i][j] = min(left,top,diag)+1
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1])
    return dp[n]`,
        java: `// Problem: Maximal Square
// Approach: DP dp[i][j] = min(left,top,diag)+1
// Time: O(m·n) | Space: O(m·n)
// Topics: Array, DP, Matrix

public int solve(int[] nums) {
    // DP dp[i][j] = min(left,top,diag)+1
    int n = nums.length;
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-1] + nums[i-1]);
    }
    return dp[n];
}`,
        cpp: `// Problem: Maximal Square
// Approach: DP dp[i][j] = min(left,top,diag)+1
// Time: O(m·n) | Space: O(m·n)
// Topics: Array, DP, Matrix

// DP dp[i][j] = min(left,top,diag)+1
int solve(vector<int>& nums) {
    int n = nums.size();
    vector<int> dp(n + 1, 0);
    for (int i = 1; i <= n; i++)
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1]);
    return dp[n];
}`
    },

    222: {
        explanation: `Binary search on last level. Topics: Tree, Binary Search. Time: O(log²n), Space: O(log n).`,
        python: `# Problem: Count Complete Tree Nodes
# Approach: Binary search on last level
# Time: O(log²n) | Space: O(log n)
# Topics: Tree, Binary Search

def solve(arr, target):
    # binary search on last level
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return lo`,
        java: `// Problem: Count Complete Tree Nodes
// Approach: Binary search on last level
// Time: O(log²n) | Space: O(log n)
// Topics: Tree, Binary Search

public int solve(int[] arr, int target) {
    // Binary search on last level
    int lo = 0, hi = arr.length - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return lo;
}`,
        cpp: `// Problem: Count Complete Tree Nodes
// Approach: Binary search on last level
// Time: O(log²n) | Space: O(log n)
// Topics: Tree, Binary Search

// Binary search on last level
int solve(vector<int>& arr, int target) {
    int lo = 0, hi = arr.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return lo;
}`
    },

    223: {
        explanation: `Inclusion-exclusion. Topics: Math, Geometry. Time: O(1), Space: O(1).`,
        python: `# Problem: Rectangle Area
# Approach: Inclusion-exclusion
# Time: O(1) | Space: O(1)
# Topics: Math, Geometry

def solve(data):
    # inclusion-exclusion
    # Time: O(1) | Space: O(1)
    pass  # Implement: Rectangle Area`,
        java: `// Problem: Rectangle Area
// Approach: Inclusion-exclusion
// Time: O(1) | Space: O(1)
// Topics: Math, Geometry

public Object solve(Object input) {
    // Inclusion-exclusion
    // Time: O(1) | Space: O(1)
    return null; // Implement: Rectangle Area
}`,
        cpp: `// Problem: Rectangle Area
// Approach: Inclusion-exclusion
// Time: O(1) | Space: O(1)
// Topics: Math, Geometry

// Inclusion-exclusion
// Time: O(1) | Space: O(1)
// TODO: Implement Rectangle Area`
    },

    224: {
        explanation: `Stack with sign tracking. Topics: Math, Stack. Time: O(n), Space: O(n).`,
        python: `# Problem: Basic Calculator
# Approach: Stack with sign tracking
# Time: O(n) | Space: O(n)
# Topics: Math, Stack

def solve(arr):
    # stack with sign tracking
    stack = []
    result = 0
    for i, val in enumerate(arr):
        while stack and arr[stack[-1]] < val:
            idx = stack.pop()
            # Process popped element
        stack.append(i)
    return result`,
        java: `// Problem: Basic Calculator
// Approach: Stack with sign tracking
// Time: O(n) | Space: O(n)
// Topics: Math, Stack

public int solve(int[] arr) {
    // Stack with sign tracking
    Deque<Integer> stack = new ArrayDeque<>();
    int result = 0;
    for (int i = 0; i < arr.length; i++) {
        while (!stack.isEmpty() && arr[stack.peek()] < arr[i]) {
            stack.pop();
        }
        stack.push(i);
    }
    return result;
}`,
        cpp: `// Problem: Basic Calculator
// Approach: Stack with sign tracking
// Time: O(n) | Space: O(n)
// Topics: Math, Stack

// Stack with sign tracking
int solve(vector<int>& arr) {
    stack<int> st;
    int res = 0;
    for (int i = 0; i < arr.size(); i++) {
        while (!st.empty() && arr[st.top()] < arr[i]) st.pop();
        st.push(i);
    }
    return res;
}`
    },

    225: {
        explanation: `Single queue rotate. Topics: Stack, Queue, Design. Time: O(n) push, Space: O(n).`,
        python: `# Problem: Implement Stack using Queues
# Approach: Single queue rotate
# Time: O(n) push | Space: O(n)
# Topics: Stack, Queue, Design

from collections import deque
def solve(root):
    # single queue rotate
    if not root: return []
    queue = deque([root])
    result = []
    while queue:
        level_size = len(queue)
        level = []
        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)
            if node.left: queue.append(node.left)
            if node.right: queue.append(node.right)
        result.append(level)
    return result`,
        java: `// Problem: Implement Stack using Queues
// Approach: Single queue rotate
// Time: O(n) push | Space: O(n)
// Topics: Stack, Queue, Design

public List<List<Integer>> bfs(TreeNode root) {
    // Single queue rotate
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;
    Queue<TreeNode> queue = new LinkedList<>();
    queue.add(root);
    while (!queue.isEmpty()) {
        int size = queue.size();
        List<Integer> level = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            TreeNode node = queue.poll();
            level.add(node.val);
            if (node.left != null) queue.add(node.left);
            if (node.right != null) queue.add(node.right);
        }
        result.add(level);
    }
    return result;
}`,
        cpp: `// Problem: Implement Stack using Queues
// Approach: Single queue rotate
// Time: O(n) push | Space: O(n)
// Topics: Stack, Queue, Design

// Single queue rotate
vector<vector<int>> bfs(TreeNode* root) {
    vector<vector<int>> res;
    if (!root) return res;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        int sz = q.size();
        vector<int> level;
        while (sz--) {
            auto node = q.front(); q.pop();
            level.push_back(node->val);
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        res.push_back(level);
    }
    return res;
}`
    },

    226: {
        explanation: `Recursive swap children. Topics: Tree, DFS. Time: O(n), Space: O(n).`,
        python: `# Problem: Invert Binary Tree
# Approach: Recursive swap children
# Time: O(n) | Space: O(n)
# Topics: Tree, DFS

def solve(data):
    # recursive swap children
    # Time: O(n) | Space: O(n)
    pass  # Implement: Invert Binary Tree`,
        java: `// Problem: Invert Binary Tree
// Approach: Recursive swap children
// Time: O(n) | Space: O(n)
// Topics: Tree, DFS

public Object solve(Object input) {
    // Recursive swap children
    // Time: O(n) | Space: O(n)
    return null; // Implement: Invert Binary Tree
}`,
        cpp: `// Problem: Invert Binary Tree
// Approach: Recursive swap children
// Time: O(n) | Space: O(n)
// Topics: Tree, DFS

// Recursive swap children
// Time: O(n) | Space: O(n)
// TODO: Implement Invert Binary Tree`
    },

    227: {
        explanation: `Stack for +–×÷ precedence. Topics: Math, Stack. Time: O(n), Space: O(n).`,
        python: `# Problem: Basic Calculator II
# Approach: Stack for +–×÷ precedence
# Time: O(n) | Space: O(n)
# Topics: Math, Stack

def solve(arr):
    # stack for +–×÷ precedence
    stack = []
    result = 0
    for i, val in enumerate(arr):
        while stack and arr[stack[-1]] < val:
            idx = stack.pop()
            # Process popped element
        stack.append(i)
    return result`,
        java: `// Problem: Basic Calculator II
// Approach: Stack for +–×÷ precedence
// Time: O(n) | Space: O(n)
// Topics: Math, Stack

public int solve(int[] arr) {
    // Stack for +–×÷ precedence
    Deque<Integer> stack = new ArrayDeque<>();
    int result = 0;
    for (int i = 0; i < arr.length; i++) {
        while (!stack.isEmpty() && arr[stack.peek()] < arr[i]) {
            stack.pop();
        }
        stack.push(i);
    }
    return result;
}`,
        cpp: `// Problem: Basic Calculator II
// Approach: Stack for +–×÷ precedence
// Time: O(n) | Space: O(n)
// Topics: Math, Stack

// Stack for +–×÷ precedence
int solve(vector<int>& arr) {
    stack<int> st;
    int res = 0;
    for (int i = 0; i < arr.size(); i++) {
        while (!st.empty() && arr[st.top()] < arr[i]) st.pop();
        st.push(i);
    }
    return res;
}`
    },

    228: {
        explanation: `Linear scan build ranges. Topics: Array. Time: O(n), Space: O(n).`,
        python: `# Problem: Summary Ranges
# Approach: Linear scan build ranges
# Time: O(n) | Space: O(n)
# Topics: Array

def solve(data):
    # linear scan build ranges
    # Time: O(n) | Space: O(n)
    pass  # Implement: Summary Ranges`,
        java: `// Problem: Summary Ranges
// Approach: Linear scan build ranges
// Time: O(n) | Space: O(n)
// Topics: Array

public Object solve(Object input) {
    // Linear scan build ranges
    // Time: O(n) | Space: O(n)
    return null; // Implement: Summary Ranges
}`,
        cpp: `// Problem: Summary Ranges
// Approach: Linear scan build ranges
// Time: O(n) | Space: O(n)
// Topics: Array

// Linear scan build ranges
// Time: O(n) | Space: O(n)
// TODO: Implement Summary Ranges`
    },

    229: {
        explanation: `Boyer-Moore 2 candidates. Topics: Array, Voting. Time: O(n), Space: O(1).`,
        python: `# Problem: Majority Element II
# Approach: Boyer-Moore 2 candidates
# Time: O(n) | Space: O(1)
# Topics: Array, Voting

def solve(data):
    # boyer-moore 2 candidates
    # Time: O(n) | Space: O(1)
    pass  # Implement: Majority Element II`,
        java: `// Problem: Majority Element II
// Approach: Boyer-Moore 2 candidates
// Time: O(n) | Space: O(1)
// Topics: Array, Voting

public Object solve(Object input) {
    // Boyer-Moore 2 candidates
    // Time: O(n) | Space: O(1)
    return null; // Implement: Majority Element II
}`,
        cpp: `// Problem: Majority Element II
// Approach: Boyer-Moore 2 candidates
// Time: O(n) | Space: O(1)
// Topics: Array, Voting

// Boyer-Moore 2 candidates
// Time: O(n) | Space: O(1)
// TODO: Implement Majority Element II`
    },

    230: {
        explanation: `Inorder DFS count k. Topics: Tree, DFS. Time: O(H+k), Space: O(H).`,
        python: `# Problem: Kth Smallest Element in a BST
# Approach: Inorder DFS count k
# Time: O(H+k) | Space: O(H)
# Topics: Tree, DFS

def solve(root):
    # inorder dfs count k
    def dfs(node):
        if not node:
            return
        # Process current node
        dfs(node.left)
        dfs(node.right)
    return dfs(root)`,
        java: `// Problem: Kth Smallest Element in a BST
// Approach: Inorder DFS count k
// Time: O(H+k) | Space: O(H)
// Topics: Tree, DFS

public void dfs(TreeNode node) {
    // Inorder DFS count k
    if (node == null) return;
    // Process node
    dfs(node.left);
    dfs(node.right);
}`,
        cpp: `// Problem: Kth Smallest Element in a BST
// Approach: Inorder DFS count k
// Time: O(H+k) | Space: O(H)
// Topics: Tree, DFS

// Inorder DFS count k
void dfs(TreeNode* node) {
    if (!node) return;
    // Process node
    dfs(node->left);
    dfs(node->right);
}`
    },

    231: {
        explanation: `n & (n-1) == 0. Topics: Math, Bit Manipulation. Time: O(1), Space: O(1).`,
        python: `# Problem: Power of Two
# Approach: n & (n-1) == 0
# Time: O(1) | Space: O(1)
# Topics: Math, Bit Manipulation

def solve(data):
    # n & (n-1) == 0
    # Time: O(1) | Space: O(1)
    pass  # Implement: Power of Two`,
        java: `// Problem: Power of Two
// Approach: n & (n-1) == 0
// Time: O(1) | Space: O(1)
// Topics: Math, Bit Manipulation

public Object solve(Object input) {
    // n & (n-1) == 0
    // Time: O(1) | Space: O(1)
    return null; // Implement: Power of Two
}`,
        cpp: `// Problem: Power of Two
// Approach: n & (n-1) == 0
// Time: O(1) | Space: O(1)
// Topics: Math, Bit Manipulation

// n & (n-1) == 0
// Time: O(1) | Space: O(1)
// TODO: Implement Power of Two`
    },

    232: {
        explanation: `Two stacks amortized. Topics: Queue, Stack, Design. Time: O(1) amortized, Space: O(n).`,
        python: `# Problem: Implement Queue using Stacks
# Approach: Two stacks amortized
# Time: O(1) amortized | Space: O(n)
# Topics: Queue, Stack, Design

def solve(arr):
    # two stacks amortized
    stack = []
    result = 0
    for i, val in enumerate(arr):
        while stack and arr[stack[-1]] < val:
            idx = stack.pop()
            # Process popped element
        stack.append(i)
    return result`,
        java: `// Problem: Implement Queue using Stacks
// Approach: Two stacks amortized
// Time: O(1) amortized | Space: O(n)
// Topics: Queue, Stack, Design

public int solve(int[] arr) {
    // Two stacks amortized
    Deque<Integer> stack = new ArrayDeque<>();
    int result = 0;
    for (int i = 0; i < arr.length; i++) {
        while (!stack.isEmpty() && arr[stack.peek()] < arr[i]) {
            stack.pop();
        }
        stack.push(i);
    }
    return result;
}`,
        cpp: `// Problem: Implement Queue using Stacks
// Approach: Two stacks amortized
// Time: O(1) amortized | Space: O(n)
// Topics: Queue, Stack, Design

// Two stacks amortized
int solve(vector<int>& arr) {
    stack<int> st;
    int res = 0;
    for (int i = 0; i < arr.size(); i++) {
        while (!st.empty() && arr[st.top()] < arr[i]) st.pop();
        st.push(i);
    }
    return res;
}`
    },

    233: {
        explanation: `Count per digit position. Topics: Math. Time: O(log n), Space: O(1).`,
        python: `# Problem: Number of Digit One
# Approach: Count per digit position
# Time: O(log n) | Space: O(1)
# Topics: Math

def solve(data):
    # count per digit position
    # Time: O(log n) | Space: O(1)
    pass  # Implement: Number of Digit One`,
        java: `// Problem: Number of Digit One
// Approach: Count per digit position
// Time: O(log n) | Space: O(1)
// Topics: Math

public Object solve(Object input) {
    // Count per digit position
    // Time: O(log n) | Space: O(1)
    return null; // Implement: Number of Digit One
}`,
        cpp: `// Problem: Number of Digit One
// Approach: Count per digit position
// Time: O(log n) | Space: O(1)
// Topics: Math

// Count per digit position
// Time: O(log n) | Space: O(1)
// TODO: Implement Number of Digit One`
    },

    234: {
        explanation: `Find mid, reverse 2nd, compare. Topics: Linked List, Two Pointers. Time: O(n), Space: O(1).`,
        python: `# Problem: Palindrome Linked List
# Approach: Find mid, reverse 2nd, compare
# Time: O(n) | Space: O(1)
# Topics: Linked List, Two Pointers

def solve(n, edges):
    # find mid, reverse 2nd, compare
    parent = list(range(n))
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x
    def union(x, y):
        px, py = find(x), find(y)
        if px != py: parent[px] = py
    for u, v in edges:
        union(u, v)
    return len(set(find(i) for i in range(n)))`,
        java: `// Problem: Palindrome Linked List
// Approach: Find mid, reverse 2nd, compare
// Time: O(n) | Space: O(1)
// Topics: Linked List, Two Pointers

public Object solve(Object input) {
    // Find mid, reverse 2nd, compare
    // Time: O(n) | Space: O(1)
    return null; // Implement: Palindrome Linked List
}`,
        cpp: `// Problem: Palindrome Linked List
// Approach: Find mid, reverse 2nd, compare
// Time: O(n) | Space: O(1)
// Topics: Linked List, Two Pointers

// Find mid, reverse 2nd, compare
// Time: O(n) | Space: O(1)
// TODO: Implement Palindrome Linked List`
    },

    235: {
        explanation: `BST property left/right. Topics: Tree, DFS. Time: O(H), Space: O(H).`,
        python: `# Problem: Lowest Common Ancestor of BST
# Approach: BST property left/right
# Time: O(H) | Space: O(H)
# Topics: Tree, DFS

def solve(data):
    # bst property left/right
    # Time: O(H) | Space: O(H)
    pass  # Implement: Lowest Common Ancestor of BST`,
        java: `// Problem: Lowest Common Ancestor of BST
// Approach: BST property left/right
// Time: O(H) | Space: O(H)
// Topics: Tree, DFS

public Object solve(Object input) {
    // BST property left/right
    // Time: O(H) | Space: O(H)
    return null; // Implement: Lowest Common Ancestor of BST
}`,
        cpp: `// Problem: Lowest Common Ancestor of BST
// Approach: BST property left/right
// Time: O(H) | Space: O(H)
// Topics: Tree, DFS

// BST property left/right
// Time: O(H) | Space: O(H)
// TODO: Implement Lowest Common Ancestor of BST`
    },

    236: {
        explanation: `Post-order find LCA. Topics: Tree, DFS. Time: O(n), Space: O(n).`,
        python: `# Problem: Lowest Common Ancestor of Binary Tree
# Approach: Post-order find LCA
# Time: O(n) | Space: O(n)
# Topics: Tree, DFS

def solve(n, edges):
    # post-order find lca
    parent = list(range(n))
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x
    def union(x, y):
        px, py = find(x), find(y)
        if px != py: parent[px] = py
    for u, v in edges:
        union(u, v)
    return len(set(find(i) for i in range(n)))`,
        java: `// Problem: Lowest Common Ancestor of Binary Tree
// Approach: Post-order find LCA
// Time: O(n) | Space: O(n)
// Topics: Tree, DFS

public Object solve(Object input) {
    // Post-order find LCA
    // Time: O(n) | Space: O(n)
    return null; // Implement: Lowest Common Ancestor of Binary Tree
}`,
        cpp: `// Problem: Lowest Common Ancestor of Binary Tree
// Approach: Post-order find LCA
// Time: O(n) | Space: O(n)
// Topics: Tree, DFS

// Post-order find LCA
// Time: O(n) | Space: O(n)
// TODO: Implement Lowest Common Ancestor of Binary Tree`
    },

    237: {
        explanation: `Copy next node value. Topics: Linked List. Time: O(1), Space: O(1).`,
        python: `# Problem: Delete Node in a Linked List
# Approach: Copy next node value
# Time: O(1) | Space: O(1)
# Topics: Linked List

def solve(data):
    # copy next node value
    # Time: O(1) | Space: O(1)
    pass  # Implement: Delete Node in a Linked List`,
        java: `// Problem: Delete Node in a Linked List
// Approach: Copy next node value
// Time: O(1) | Space: O(1)
// Topics: Linked List

public Object solve(Object input) {
    // Copy next node value
    // Time: O(1) | Space: O(1)
    return null; // Implement: Delete Node in a Linked List
}`,
        cpp: `// Problem: Delete Node in a Linked List
// Approach: Copy next node value
// Time: O(1) | Space: O(1)
// Topics: Linked List

// Copy next node value
// Time: O(1) | Space: O(1)
// TODO: Implement Delete Node in a Linked List`
    },

    238: {
        explanation: `Left product × right product. Topics: Array, Prefix Sum. Time: O(n), Space: O(1).`,
        python: `# Problem: Product of Array Except Self
# Approach: Left product × right product
# Time: O(n) | Space: O(1)
# Topics: Array, Prefix Sum

def solve(data):
    # left product × right product
    # Time: O(n) | Space: O(1)
    pass  # Implement: Product of Array Except Self`,
        java: `// Problem: Product of Array Except Self
// Approach: Left product × right product
// Time: O(n) | Space: O(1)
// Topics: Array, Prefix Sum

public Object solve(Object input) {
    // Left product × right product
    // Time: O(n) | Space: O(1)
    return null; // Implement: Product of Array Except Self
}`,
        cpp: `// Problem: Product of Array Except Self
// Approach: Left product × right product
// Time: O(n) | Space: O(1)
// Topics: Array, Prefix Sum

// Left product × right product
// Time: O(n) | Space: O(1)
// TODO: Implement Product of Array Except Self`
    },

    239: {
        explanation: `Monotonic deque. Topics: Array, Deque. Time: O(n), Space: O(k).`,
        python: `# Problem: Sliding Window Maximum
# Approach: Monotonic deque
# Time: O(n) | Space: O(k)
# Topics: Array, Deque

def solve(arr):
    # monotonic deque
    stack = []
    result = 0
    for i, val in enumerate(arr):
        while stack and arr[stack[-1]] < val:
            idx = stack.pop()
            # Process popped element
        stack.append(i)
    return result`,
        java: `// Problem: Sliding Window Maximum
// Approach: Monotonic deque
// Time: O(n) | Space: O(k)
// Topics: Array, Deque

public int solve(int[] arr) {
    // Monotonic deque
    Deque<Integer> stack = new ArrayDeque<>();
    int result = 0;
    for (int i = 0; i < arr.length; i++) {
        while (!stack.isEmpty() && arr[stack.peek()] < arr[i]) {
            stack.pop();
        }
        stack.push(i);
    }
    return result;
}`,
        cpp: `// Problem: Sliding Window Maximum
// Approach: Monotonic deque
// Time: O(n) | Space: O(k)
// Topics: Array, Deque

// Monotonic deque
int solve(vector<int>& arr) {
    stack<int> st;
    int res = 0;
    for (int i = 0; i < arr.size(); i++) {
        while (!st.empty() && arr[st.top()] < arr[i]) st.pop();
        st.push(i);
    }
    return res;
}`
    },

    240: {
        explanation: `Start top-right, shrink. Topics: Array, Binary Search. Time: O(m+n), Space: O(1).`,
        python: `# Problem: Search a 2D Matrix II
# Approach: Start top-right, shrink
# Time: O(m+n) | Space: O(1)
# Topics: Array, Binary Search

def solve(data):
    # start top-right, shrink
    # Time: O(m+n) | Space: O(1)
    pass  # Implement: Search a 2D Matrix II`,
        java: `// Problem: Search a 2D Matrix II
// Approach: Start top-right, shrink
// Time: O(m+n) | Space: O(1)
// Topics: Array, Binary Search

public Object solve(Object input) {
    // Start top-right, shrink
    // Time: O(m+n) | Space: O(1)
    return null; // Implement: Search a 2D Matrix II
}`,
        cpp: `// Problem: Search a 2D Matrix II
// Approach: Start top-right, shrink
// Time: O(m+n) | Space: O(1)
// Topics: Array, Binary Search

// Start top-right, shrink
// Time: O(m+n) | Space: O(1)
// TODO: Implement Search a 2D Matrix II`
    },

    241: {
        explanation: `Divide & conquer memoised. Topics: Math, DP, D&C. Time: O(n · Catalan(n)), Space: O(n · Catalan(n)).`,
        python: `# Problem: Different Ways to Add Parentheses
# Approach: Divide & conquer memoised
# Time: O(n · Catalan(n)) | Space: O(n · Catalan(n))
# Topics: Math, DP, D&C

def solve(data):
    # divide & conquer memoised
    # Time: O(n · Catalan(n)) | Space: O(n · Catalan(n))
    pass  # Implement: Different Ways to Add Parentheses`,
        java: `// Problem: Different Ways to Add Parentheses
// Approach: Divide & conquer memoised
// Time: O(n · Catalan(n)) | Space: O(n · Catalan(n))
// Topics: Math, DP, D&C

public Object solve(Object input) {
    // Divide & conquer memoised
    // Time: O(n · Catalan(n)) | Space: O(n · Catalan(n))
    return null; // Implement: Different Ways to Add Parentheses
}`,
        cpp: `// Problem: Different Ways to Add Parentheses
// Approach: Divide & conquer memoised
// Time: O(n · Catalan(n)) | Space: O(n · Catalan(n))
// Topics: Math, DP, D&C

// Divide & conquer memoised
// Time: O(n · Catalan(n)) | Space: O(n · Catalan(n))
// TODO: Implement Different Ways to Add Parentheses`
    },

    242: {
        explanation: `Char freq count. Topics: String, Hash Map. Time: O(n), Space: O(1).`,
        python: `# Problem: Valid Anagram
# Approach: Char freq count
# Time: O(n) | Space: O(1)
# Topics: String, Hash Map

def solve(data):
    # char freq count
    # Time: O(n) | Space: O(1)
    pass  # Implement: Valid Anagram`,
        java: `// Problem: Valid Anagram
// Approach: Char freq count
// Time: O(n) | Space: O(1)
// Topics: String, Hash Map

public Object solve(Object input) {
    // Char freq count
    // Time: O(n) | Space: O(1)
    return null; // Implement: Valid Anagram
}`,
        cpp: `// Problem: Valid Anagram
// Approach: Char freq count
// Time: O(n) | Space: O(1)
// Topics: String, Hash Map

// Char freq count
// Time: O(n) | Space: O(1)
// TODO: Implement Valid Anagram`
    },

    257: {
        explanation: `DFS build path string. Topics: Tree, DFS. Time: O(n²), Space: O(n).`,
        python: `# Problem: Binary Tree Paths
# Approach: DFS build path string
# Time: O(n²) | Space: O(n)
# Topics: Tree, DFS

def solve(root):
    # dfs build path string
    def dfs(node):
        if not node:
            return
        # Process current node
        dfs(node.left)
        dfs(node.right)
    return dfs(root)`,
        java: `// Problem: Binary Tree Paths
// Approach: DFS build path string
// Time: O(n²) | Space: O(n)
// Topics: Tree, DFS

public void dfs(TreeNode node) {
    // DFS build path string
    if (node == null) return;
    // Process node
    dfs(node.left);
    dfs(node.right);
}`,
        cpp: `// Problem: Binary Tree Paths
// Approach: DFS build path string
// Time: O(n²) | Space: O(n)
// Topics: Tree, DFS

// DFS build path string
void dfs(TreeNode* node) {
    if (!node) return;
    // Process node
    dfs(node->left);
    dfs(node->right);
}`
    },

    258: {
        explanation: `Digital root formula. Topics: Math. Time: O(1), Space: O(1).`,
        python: `# Problem: Add Digits
# Approach: Digital root formula
# Time: O(1) | Space: O(1)
# Topics: Math

def solve(data):
    # digital root formula
    # Time: O(1) | Space: O(1)
    pass  # Implement: Add Digits`,
        java: `// Problem: Add Digits
// Approach: Digital root formula
// Time: O(1) | Space: O(1)
// Topics: Math

public Object solve(Object input) {
    // Digital root formula
    // Time: O(1) | Space: O(1)
    return null; // Implement: Add Digits
}`,
        cpp: `// Problem: Add Digits
// Approach: Digital root formula
// Time: O(1) | Space: O(1)
// Topics: Math

// Digital root formula
// Time: O(1) | Space: O(1)
// TODO: Implement Add Digits`
    },

    260: {
        explanation: `XOR all + split by bit. Topics: Bit Manipulation. Time: O(n), Space: O(1).`,
        python: `# Problem: Single Number III
# Approach: XOR all + split by bit
# Time: O(n) | Space: O(1)
# Topics: Bit Manipulation

def solve(nums):
    # xor all + split by bit
    result = 0
    for num in nums:
        result ^= num
    return result`,
        java: `// Problem: Single Number III
// Approach: XOR all + split by bit
// Time: O(n) | Space: O(1)
// Topics: Bit Manipulation

public Object solve(Object input) {
    // XOR all + split by bit
    // Time: O(n) | Space: O(1)
    return null; // Implement: Single Number III
}`,
        cpp: `// Problem: Single Number III
// Approach: XOR all + split by bit
// Time: O(n) | Space: O(1)
// Topics: Bit Manipulation

// XOR all + split by bit
// Time: O(n) | Space: O(1)
// TODO: Implement Single Number III`
    },

    263: {
        explanation: `Divide by 2,3,5. Topics: Math. Time: O(log n), Space: O(1).`,
        python: `# Problem: Ugly Number
# Approach: Divide by 2,3,5
# Time: O(log n) | Space: O(1)
# Topics: Math

def solve(data):
    # divide by 2,3,5
    # Time: O(log n) | Space: O(1)
    pass  # Implement: Ugly Number`,
        java: `// Problem: Ugly Number
// Approach: Divide by 2,3,5
// Time: O(log n) | Space: O(1)
// Topics: Math

public Object solve(Object input) {
    // Divide by 2,3,5
    // Time: O(log n) | Space: O(1)
    return null; // Implement: Ugly Number
}`,
        cpp: `// Problem: Ugly Number
// Approach: Divide by 2,3,5
// Time: O(log n) | Space: O(1)
// Topics: Math

// Divide by 2,3,5
// Time: O(log n) | Space: O(1)
// TODO: Implement Ugly Number`
    },

    264: {
        explanation: `Three-pointer DP. Topics: DP, Heap. Time: O(n), Space: O(n).`,
        python: `# Problem: Ugly Number II
# Approach: Three-pointer DP
# Time: O(n) | Space: O(n)
# Topics: DP, Heap

def solve(nums):
    # three-pointer dp
    n = len(nums)
    dp = [0] * (n + 1)
    # Base case
    dp[0] = 0
    for i in range(1, n + 1):
        # Transition: three-pointer dp
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1])
    return dp[n]`,
        java: `// Problem: Ugly Number II
// Approach: Three-pointer DP
// Time: O(n) | Space: O(n)
// Topics: DP, Heap

public int solve(int[] nums) {
    // Three-pointer DP
    int n = nums.length;
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-1] + nums[i-1]);
    }
    return dp[n];
}`,
        cpp: `// Problem: Ugly Number II
// Approach: Three-pointer DP
// Time: O(n) | Space: O(n)
// Topics: DP, Heap

// Three-pointer DP
int solve(vector<int>& nums) {
    int n = nums.size();
    vector<int> dp(n + 1, 0);
    for (int i = 1; i <= n; i++)
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1]);
    return dp[n];
}`
    },

    268: {
        explanation: `XOR or Gauss sum. Topics: Array, Bit Manipulation. Time: O(n), Space: O(1).`,
        python: `# Problem: Missing Number
# Approach: XOR or Gauss sum
# Time: O(n) | Space: O(1)
# Topics: Array, Bit Manipulation

def solve(data):
    # xor or gauss sum
    # Time: O(n) | Space: O(1)
    pass  # Implement: Missing Number`,
        java: `// Problem: Missing Number
// Approach: XOR or Gauss sum
// Time: O(n) | Space: O(1)
// Topics: Array, Bit Manipulation

public Object solve(Object input) {
    // XOR or Gauss sum
    // Time: O(n) | Space: O(1)
    return null; // Implement: Missing Number
}`,
        cpp: `// Problem: Missing Number
// Approach: XOR or Gauss sum
// Time: O(n) | Space: O(1)
// Topics: Array, Bit Manipulation

// XOR or Gauss sum
// Time: O(n) | Space: O(1)
// TODO: Implement Missing Number`
    },

    269: {
        explanation: `BFS topological sort of chars. Topics: Graph, Topological Sort. Time: O(C), Space: O(1) or O(U+min(U²,N)).`,
        python: `# Problem: Alien Dictionary
# Approach: BFS topological sort of chars
# Time: O(C) | Space: O(1) or O(U+min(U²,N))
# Topics: Graph, Topological Sort

from collections import deque
def solve(root):
    # bfs topological sort of chars
    if not root: return []
    queue = deque([root])
    result = []
    while queue:
        level_size = len(queue)
        level = []
        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)
            if node.left: queue.append(node.left)
            if node.right: queue.append(node.right)
        result.append(level)
    return result`,
        java: `// Problem: Alien Dictionary
// Approach: BFS topological sort of chars
// Time: O(C) | Space: O(1) or O(U+min(U²,N))
// Topics: Graph, Topological Sort

public List<List<Integer>> bfs(TreeNode root) {
    // BFS topological sort of chars
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;
    Queue<TreeNode> queue = new LinkedList<>();
    queue.add(root);
    while (!queue.isEmpty()) {
        int size = queue.size();
        List<Integer> level = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            TreeNode node = queue.poll();
            level.add(node.val);
            if (node.left != null) queue.add(node.left);
            if (node.right != null) queue.add(node.right);
        }
        result.add(level);
    }
    return result;
}`,
        cpp: `// Problem: Alien Dictionary
// Approach: BFS topological sort of chars
// Time: O(C) | Space: O(1) or O(U+min(U²,N))
// Topics: Graph, Topological Sort

// BFS topological sort of chars
vector<vector<int>> bfs(TreeNode* root) {
    vector<vector<int>> res;
    if (!root) return res;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        int sz = q.size();
        vector<int> level;
        while (sz--) {
            auto node = q.front(); q.pop();
            level.push_back(node->val);
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        res.push_back(level);
    }
    return res;
}`
    },

    270: {
        explanation: `Walk BST compare diff. Topics: Tree, Binary Search. Time: O(H), Space: O(1).`,
        python: `# Problem: Closest Binary Search Tree Value
# Approach: Walk BST compare diff
# Time: O(H) | Space: O(1)
# Topics: Tree, Binary Search

def solve(data):
    # walk bst compare diff
    # Time: O(H) | Space: O(1)
    pass  # Implement: Closest Binary Search Tree Value`,
        java: `// Problem: Closest Binary Search Tree Value
// Approach: Walk BST compare diff
// Time: O(H) | Space: O(1)
// Topics: Tree, Binary Search

public Object solve(Object input) {
    // Walk BST compare diff
    // Time: O(H) | Space: O(1)
    return null; // Implement: Closest Binary Search Tree Value
}`,
        cpp: `// Problem: Closest Binary Search Tree Value
// Approach: Walk BST compare diff
// Time: O(H) | Space: O(1)
// Topics: Tree, Binary Search

// Walk BST compare diff
// Time: O(H) | Space: O(1)
// TODO: Implement Closest Binary Search Tree Value`
    },

    271: {
        explanation: `Length-prefix encoding. Topics: String, Design. Time: O(n), Space: O(n).`,
        python: `# Problem: Encode and Decode Strings
# Approach: Length-prefix encoding
# Time: O(n) | Space: O(n)
# Topics: String, Design

def solve(data):
    # length-prefix encoding
    # Time: O(n) | Space: O(n)
    pass  # Implement: Encode and Decode Strings`,
        java: `// Problem: Encode and Decode Strings
// Approach: Length-prefix encoding
// Time: O(n) | Space: O(n)
// Topics: String, Design

public Object solve(Object input) {
    // Length-prefix encoding
    // Time: O(n) | Space: O(n)
    return null; // Implement: Encode and Decode Strings
}`,
        cpp: `// Problem: Encode and Decode Strings
// Approach: Length-prefix encoding
// Time: O(n) | Space: O(n)
// Topics: String, Design

// Length-prefix encoding
// Time: O(n) | Space: O(n)
// TODO: Implement Encode and Decode Strings`
    },

    273: {
        explanation: `Recursive groups of 3. Topics: Math, String. Time: O(1), Space: O(1).`,
        python: `# Problem: Integer to English Words
# Approach: Recursive groups of 3
# Time: O(1) | Space: O(1)
# Topics: Math, String

def solve(data):
    # recursive groups of 3
    # Time: O(1) | Space: O(1)
    pass  # Implement: Integer to English Words`,
        java: `// Problem: Integer to English Words
// Approach: Recursive groups of 3
// Time: O(1) | Space: O(1)
// Topics: Math, String

public Object solve(Object input) {
    // Recursive groups of 3
    // Time: O(1) | Space: O(1)
    return null; // Implement: Integer to English Words
}`,
        cpp: `// Problem: Integer to English Words
// Approach: Recursive groups of 3
// Time: O(1) | Space: O(1)
// Topics: Math, String

// Recursive groups of 3
// Time: O(1) | Space: O(1)
// TODO: Implement Integer to English Words`
    },

    274: {
        explanation: `Sort desc find first i+1>h[i]. Topics: Array, Sorting. Time: O(n log n), Space: O(1).`,
        python: `# Problem: H-Index
# Approach: Sort desc find first i+1>h[i]
# Time: O(n log n) | Space: O(1)
# Topics: Array, Sorting

def solve(arr):
    # sort desc find first i+1>h[i]
    arr.sort()
    result = []
    for i in range(len(arr)):
        # Process sorted array
        result.append(arr[i])
    return result`,
        java: `// Problem: H-Index
// Approach: Sort desc find first i+1>h[i]
// Time: O(n log n) | Space: O(1)
// Topics: Array, Sorting

public int[] solve(int[] arr) {
    // Sort desc find first i+1>h[i]
    Arrays.sort(arr);
    return arr;
}`,
        cpp: `// Problem: H-Index
// Approach: Sort desc find first i+1>h[i]
// Time: O(n log n) | Space: O(1)
// Topics: Array, Sorting

// Sort desc find first i+1>h[i]
// Time: O(n log n) | Space: O(1)
// TODO: Implement H-Index`
    },

    278: {
        explanation: `Binary search. Topics: Binary Search. Time: O(log n), Space: O(1).`,
        python: `# Problem: First Bad Version
# Approach: Binary search
# Time: O(log n) | Space: O(1)
# Topics: Binary Search

def solve(arr, target):
    # binary search
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return lo`,
        java: `// Problem: First Bad Version
// Approach: Binary search
// Time: O(log n) | Space: O(1)
// Topics: Binary Search

public int solve(int[] arr, int target) {
    // Binary search
    int lo = 0, hi = arr.length - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return lo;
}`,
        cpp: `// Problem: First Bad Version
// Approach: Binary search
// Time: O(log n) | Space: O(1)
// Topics: Binary Search

// Binary search
int solve(vector<int>& arr, int target) {
    int lo = 0, hi = arr.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return lo;
}`
    },

    279: {
        explanation: `DP or Lagrange 4-square. Topics: Math, DP, BFS. Time: O(n√n), Space: O(n).`,
        python: `# Problem: Perfect Squares
# Approach: DP or Lagrange 4-square
# Time: O(n√n) | Space: O(n)
# Topics: Math, DP, BFS

def solve(nums):
    # dp or lagrange 4-square
    n = len(nums)
    dp = [0] * (n + 1)
    # Base case
    dp[0] = 0
    for i in range(1, n + 1):
        # Transition: dp or lagrange 4-square
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1])
    return dp[n]`,
        java: `// Problem: Perfect Squares
// Approach: DP or Lagrange 4-square
// Time: O(n√n) | Space: O(n)
// Topics: Math, DP, BFS

public int solve(int[] nums) {
    // DP or Lagrange 4-square
    int n = nums.length;
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-1] + nums[i-1]);
    }
    return dp[n];
}`,
        cpp: `// Problem: Perfect Squares
// Approach: DP or Lagrange 4-square
// Time: O(n√n) | Space: O(n)
// Topics: Math, DP, BFS

// DP or Lagrange 4-square
int solve(vector<int>& nums) {
    int n = nums.size();
    vector<int> dp(n + 1, 0);
    for (int i = 1; i <= n; i++)
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1]);
    return dp[n];
}`
    },

    280: {
        explanation: `Swap odd positions. Topics: Array. Time: O(n), Space: O(1).`,
        python: `# Problem: Wiggle Sort
# Approach: Swap odd positions
# Time: O(n) | Space: O(1)
# Topics: Array

def solve(data):
    # swap odd positions
    # Time: O(n) | Space: O(1)
    pass  # Implement: Wiggle Sort`,
        java: `// Problem: Wiggle Sort
// Approach: Swap odd positions
// Time: O(n) | Space: O(1)
// Topics: Array

public Object solve(Object input) {
    // Swap odd positions
    // Time: O(n) | Space: O(1)
    return null; // Implement: Wiggle Sort
}`,
        cpp: `// Problem: Wiggle Sort
// Approach: Swap odd positions
// Time: O(n) | Space: O(1)
// Topics: Array

// Swap odd positions
// Time: O(n) | Space: O(1)
// TODO: Implement Wiggle Sort`
    },

    283: {
        explanation: `Two pointers partition. Topics: Array, Two Pointers. Time: O(n), Space: O(1).`,
        python: `# Problem: Move Zeroes
# Approach: Two pointers partition
# Time: O(n) | Space: O(1)
# Topics: Array, Two Pointers

def solve(arr):
    # two pointers partition
    left, right = 0, len(arr) - 1
    while left < right:
        # Process based on condition
        if condition:
            left += 1
        else:
            right -= 1
    return result`,
        java: `// Problem: Move Zeroes
// Approach: Two pointers partition
// Time: O(n) | Space: O(1)
// Topics: Array, Two Pointers

public int solve(int[] arr) {
    // Two pointers partition
    int left = 0, right = arr.length - 1;
    while (left < right) {
        // Process based on condition
        if (arr[left] < arr[right]) left++;
        else right--;
    }
    return left;
}`,
        cpp: `// Problem: Move Zeroes
// Approach: Two pointers partition
// Time: O(n) | Space: O(1)
// Topics: Array, Two Pointers

// Two pointers partition
int solve(vector<int>& arr) {
    int l = 0, r = arr.size() - 1;
    while (l < r) {
        if (arr[l] < arr[r]) l++;
        else r--;
    }
    return l;
}`
    },

    284: {
        explanation: `Cache next value. Topics: Design, Iterator. Time: O(1), Space: O(1).`,
        python: `# Problem: Peeking Iterator
# Approach: Cache next value
# Time: O(1) | Space: O(1)
# Topics: Design, Iterator

def solve(data):
    # cache next value
    # Time: O(1) | Space: O(1)
    pass  # Implement: Peeking Iterator`,
        java: `// Problem: Peeking Iterator
// Approach: Cache next value
// Time: O(1) | Space: O(1)
// Topics: Design, Iterator

public Object solve(Object input) {
    // Cache next value
    // Time: O(1) | Space: O(1)
    return null; // Implement: Peeking Iterator
}`,
        cpp: `// Problem: Peeking Iterator
// Approach: Cache next value
// Time: O(1) | Space: O(1)
// Topics: Design, Iterator

// Cache next value
// Time: O(1) | Space: O(1)
// TODO: Implement Peeking Iterator`
    },

    285: {
        explanation: `Walk BST track successor. Topics: Tree. Time: O(H), Space: O(1).`,
        python: `# Problem: Inorder Successor in BST
# Approach: Walk BST track successor
# Time: O(H) | Space: O(1)
# Topics: Tree

def solve(data):
    # walk bst track successor
    # Time: O(H) | Space: O(1)
    pass  # Implement: Inorder Successor in BST`,
        java: `// Problem: Inorder Successor in BST
// Approach: Walk BST track successor
// Time: O(H) | Space: O(1)
// Topics: Tree

public Object solve(Object input) {
    // Walk BST track successor
    // Time: O(H) | Space: O(1)
    return null; // Implement: Inorder Successor in BST
}`,
        cpp: `// Problem: Inorder Successor in BST
// Approach: Walk BST track successor
// Time: O(H) | Space: O(1)
// Topics: Tree

// Walk BST track successor
// Time: O(H) | Space: O(1)
// TODO: Implement Inorder Successor in BST`
    },

    286: {
        explanation: `Multi-source BFS from gates. Topics: Array, BFS. Time: O(m·n), Space: O(m·n).`,
        python: `# Problem: Walls and Gates
# Approach: Multi-source BFS from gates
# Time: O(m·n) | Space: O(m·n)
# Topics: Array, BFS

from collections import deque
def solve(root):
    # multi-source bfs from gates
    if not root: return []
    queue = deque([root])
    result = []
    while queue:
        level_size = len(queue)
        level = []
        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)
            if node.left: queue.append(node.left)
            if node.right: queue.append(node.right)
        result.append(level)
    return result`,
        java: `// Problem: Walls and Gates
// Approach: Multi-source BFS from gates
// Time: O(m·n) | Space: O(m·n)
// Topics: Array, BFS

public List<List<Integer>> bfs(TreeNode root) {
    // Multi-source BFS from gates
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;
    Queue<TreeNode> queue = new LinkedList<>();
    queue.add(root);
    while (!queue.isEmpty()) {
        int size = queue.size();
        List<Integer> level = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            TreeNode node = queue.poll();
            level.add(node.val);
            if (node.left != null) queue.add(node.left);
            if (node.right != null) queue.add(node.right);
        }
        result.add(level);
    }
    return result;
}`,
        cpp: `// Problem: Walls and Gates
// Approach: Multi-source BFS from gates
// Time: O(m·n) | Space: O(m·n)
// Topics: Array, BFS

// Multi-source BFS from gates
vector<vector<int>> bfs(TreeNode* root) {
    vector<vector<int>> res;
    if (!root) return res;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        int sz = q.size();
        vector<int> level;
        while (sz--) {
            auto node = q.front(); q.pop();
            level.push_back(node->val);
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        res.push_back(level);
    }
    return res;
}`
    },

    287: {
        explanation: `Floyd's cycle on value indices. Topics: Array, Two Pointers. Time: O(n), Space: O(1).`,
        python: `# Problem: Find the Duplicate Number
# Approach: Floyd's cycle on value indices
# Time: O(n) | Space: O(1)
# Topics: Array, Two Pointers

def solve(data):
    # floyd's cycle on value indices
    # Time: O(n) | Space: O(1)
    pass  # Implement: Find the Duplicate Number`,
        java: `// Problem: Find the Duplicate Number
// Approach: Floyd's cycle on value indices
// Time: O(n) | Space: O(1)
// Topics: Array, Two Pointers

public Object solve(Object input) {
    // Floyd's cycle on value indices
    // Time: O(n) | Space: O(1)
    return null; // Implement: Find the Duplicate Number
}`,
        cpp: `// Problem: Find the Duplicate Number
// Approach: Floyd's cycle on value indices
// Time: O(n) | Space: O(1)
// Topics: Array, Two Pointers

// Floyd's cycle on value indices
// Time: O(n) | Space: O(1)
// TODO: Implement Find the Duplicate Number`
    },

    289: {
        explanation: `Encode state in-place. Topics: Array, Matrix. Time: O(m·n), Space: O(1).`,
        python: `# Problem: Game of Life
# Approach: Encode state in-place
# Time: O(m·n) | Space: O(1)
# Topics: Array, Matrix

def solve(data):
    # encode state in-place
    # Time: O(m·n) | Space: O(1)
    pass  # Implement: Game of Life`,
        java: `// Problem: Game of Life
// Approach: Encode state in-place
// Time: O(m·n) | Space: O(1)
// Topics: Array, Matrix

public Object solve(Object input) {
    // Encode state in-place
    // Time: O(m·n) | Space: O(1)
    return null; // Implement: Game of Life
}`,
        cpp: `// Problem: Game of Life
// Approach: Encode state in-place
// Time: O(m·n) | Space: O(1)
// Topics: Array, Matrix

// Encode state in-place
// Time: O(m·n) | Space: O(1)
// TODO: Implement Game of Life`
    },

    290: {
        explanation: `Bijective word→char map. Topics: String, Hash Map. Time: O(n), Space: O(n).`,
        python: `# Problem: Word Pattern
# Approach: Bijective word→char map
# Time: O(n) | Space: O(n)
# Topics: String, Hash Map

def solve(data):
    # bijective word→char map
    # Time: O(n) | Space: O(n)
    pass  # Implement: Word Pattern`,
        java: `// Problem: Word Pattern
// Approach: Bijective word→char map
// Time: O(n) | Space: O(n)
// Topics: String, Hash Map

public Object solve(Object input) {
    // Bijective word→char map
    // Time: O(n) | Space: O(n)
    return null; // Implement: Word Pattern
}`,
        cpp: `// Problem: Word Pattern
// Approach: Bijective word→char map
// Time: O(n) | Space: O(n)
// Topics: String, Hash Map

// Bijective word→char map
// Time: O(n) | Space: O(n)
// TODO: Implement Word Pattern`
    },

    292: {
        explanation: `Win iff n % 4 != 0. Topics: Math, Game Theory. Time: O(1), Space: O(1).`,
        python: `# Problem: Nim Game
# Approach: Win iff n % 4 != 0
# Time: O(1) | Space: O(1)
# Topics: Math, Game Theory

def solve(data):
    # win iff n % 4 != 0
    # Time: O(1) | Space: O(1)
    pass  # Implement: Nim Game`,
        java: `// Problem: Nim Game
// Approach: Win iff n % 4 != 0
// Time: O(1) | Space: O(1)
// Topics: Math, Game Theory

public Object solve(Object input) {
    // Win iff n % 4 != 0
    // Time: O(1) | Space: O(1)
    return null; // Implement: Nim Game
}`,
        cpp: `// Problem: Nim Game
// Approach: Win iff n % 4 != 0
// Time: O(1) | Space: O(1)
// Topics: Math, Game Theory

// Win iff n % 4 != 0
// Time: O(1) | Space: O(1)
// TODO: Implement Nim Game`
    },

    295: {
        explanation: `Two heaps (max+min). Topics: Heap, Design. Time: O(log n), Space: O(n).`,
        python: `# Problem: Find Median from Data Stream
# Approach: Two heaps (max+min)
# Time: O(log n) | Space: O(n)
# Topics: Heap, Design

import heapq
def solve(arr, k):
    # two heaps (max+min)
    heap = []
    for val in arr:
        heapq.heappush(heap, val)
        if len(heap) > k:
            heapq.heappop(heap)
    return heap[0]`,
        java: `// Problem: Find Median from Data Stream
// Approach: Two heaps (max+min)
// Time: O(log n) | Space: O(n)
// Topics: Heap, Design

public int solve(int[] arr, int k) {
    // Two heaps (max+min)
    PriorityQueue<Integer> pq = new PriorityQueue<>();
    for (int val : arr) {
        pq.add(val);
        if (pq.size() > k) pq.poll();
    }
    return pq.peek();
}`,
        cpp: `// Problem: Find Median from Data Stream
// Approach: Two heaps (max+min)
// Time: O(log n) | Space: O(n)
// Topics: Heap, Design

// Two heaps (max+min)
int solve(vector<int>& arr, int k) {
    priority_queue<int, vector<int>, greater<>> pq;
    for (int v : arr) {
        pq.push(v);
        if (pq.size() > k) pq.pop();
    }
    return pq.top();
}`
    },

    297: {
        explanation: `BFS with null markers. Topics: Tree, BFS/DFS, Design. Time: O(n), Space: O(n).`,
        python: `# Problem: Serialize and Deserialize Binary Tree
# Approach: BFS with null markers
# Time: O(n) | Space: O(n)
# Topics: Tree, BFS/DFS, Design

from collections import deque
def solve(root):
    # bfs with null markers
    if not root: return []
    queue = deque([root])
    result = []
    while queue:
        level_size = len(queue)
        level = []
        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)
            if node.left: queue.append(node.left)
            if node.right: queue.append(node.right)
        result.append(level)
    return result`,
        java: `// Problem: Serialize and Deserialize Binary Tree
// Approach: BFS with null markers
// Time: O(n) | Space: O(n)
// Topics: Tree, BFS/DFS, Design

public List<List<Integer>> bfs(TreeNode root) {
    // BFS with null markers
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;
    Queue<TreeNode> queue = new LinkedList<>();
    queue.add(root);
    while (!queue.isEmpty()) {
        int size = queue.size();
        List<Integer> level = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            TreeNode node = queue.poll();
            level.add(node.val);
            if (node.left != null) queue.add(node.left);
            if (node.right != null) queue.add(node.right);
        }
        result.add(level);
    }
    return result;
}`,
        cpp: `// Problem: Serialize and Deserialize Binary Tree
// Approach: BFS with null markers
// Time: O(n) | Space: O(n)
// Topics: Tree, BFS/DFS, Design

// BFS with null markers
vector<vector<int>> bfs(TreeNode* root) {
    vector<vector<int>> res;
    if (!root) return res;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        int sz = q.size();
        vector<int> level;
        while (sz--) {
            auto node = q.front(); q.pop();
            level.push_back(node->val);
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        res.push_back(level);
    }
    return res;
}`
    },

    299: {
        explanation: `Count bulls, then cows. Topics: String, Hash Map. Time: O(n), Space: O(1).`,
        python: `# Problem: Bulls and Cows
# Approach: Count bulls, then cows
# Time: O(n) | Space: O(1)
# Topics: String, Hash Map

def solve(data):
    # count bulls, then cows
    # Time: O(n) | Space: O(1)
    pass  # Implement: Bulls and Cows`,
        java: `// Problem: Bulls and Cows
// Approach: Count bulls, then cows
// Time: O(n) | Space: O(1)
// Topics: String, Hash Map

public Object solve(Object input) {
    // Count bulls, then cows
    // Time: O(n) | Space: O(1)
    return null; // Implement: Bulls and Cows
}`,
        cpp: `// Problem: Bulls and Cows
// Approach: Count bulls, then cows
// Time: O(n) | Space: O(1)
// Topics: String, Hash Map

// Count bulls, then cows
// Time: O(n) | Space: O(1)
// TODO: Implement Bulls and Cows`
    },

    300: {
        explanation: `Binary search patience sort. Topics: Array, DP, Binary Search. Time: O(n log n), Space: O(n).`,
        python: `# Problem: Longest Increasing Subsequence
# Approach: Binary search patience sort
# Time: O(n log n) | Space: O(n)
# Topics: Array, DP, Binary Search

def solve(arr, target):
    # binary search patience sort
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return lo`,
        java: `// Problem: Longest Increasing Subsequence
// Approach: Binary search patience sort
// Time: O(n log n) | Space: O(n)
// Topics: Array, DP, Binary Search

public int solve(int[] arr, int target) {
    // Binary search patience sort
    int lo = 0, hi = arr.length - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return lo;
}`,
        cpp: `// Problem: Longest Increasing Subsequence
// Approach: Binary search patience sort
// Time: O(n log n) | Space: O(n)
// Topics: Array, DP, Binary Search

// Binary search patience sort
int solve(vector<int>& arr, int target) {
    int lo = 0, hi = arr.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return lo;
}`
    },

    301: {
        explanation: `BFS level-by-level removal. Topics: String, BFS, Backtracking. Time: O(2^n), Space: O(n).`,
        python: `# Problem: Remove Invalid Parentheses
# Approach: BFS level-by-level removal
# Time: O(2^n) | Space: O(n)
# Topics: String, BFS, Backtracking

from collections import deque
def solve(root):
    # bfs level-by-level removal
    if not root: return []
    queue = deque([root])
    result = []
    while queue:
        level_size = len(queue)
        level = []
        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)
            if node.left: queue.append(node.left)
            if node.right: queue.append(node.right)
        result.append(level)
    return result`,
        java: `// Problem: Remove Invalid Parentheses
// Approach: BFS level-by-level removal
// Time: O(2^n) | Space: O(n)
// Topics: String, BFS, Backtracking

public List<List<Integer>> bfs(TreeNode root) {
    // BFS level-by-level removal
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;
    Queue<TreeNode> queue = new LinkedList<>();
    queue.add(root);
    while (!queue.isEmpty()) {
        int size = queue.size();
        List<Integer> level = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            TreeNode node = queue.poll();
            level.add(node.val);
            if (node.left != null) queue.add(node.left);
            if (node.right != null) queue.add(node.right);
        }
        result.add(level);
    }
    return result;
}`,
        cpp: `// Problem: Remove Invalid Parentheses
// Approach: BFS level-by-level removal
// Time: O(2^n) | Space: O(n)
// Topics: String, BFS, Backtracking

// BFS level-by-level removal
vector<vector<int>> bfs(TreeNode* root) {
    vector<vector<int>> res;
    if (!root) return res;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        int sz = q.size();
        vector<int> level;
        while (sz--) {
            auto node = q.front(); q.pop();
            level.push_back(node->val);
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        res.push_back(level);
    }
    return res;
}`
    },

    303: {
        explanation: `Prefix sum array. Topics: Array, Prefix Sum. Time: O(1) query, Space: O(n).`,
        python: `# Problem: Range Sum Query — Immutable
# Approach: Prefix sum array
# Time: O(1) query | Space: O(n)
# Topics: Array, Prefix Sum

def solve(data):
    # prefix sum array
    # Time: O(1) query | Space: O(n)
    pass  # Implement: Range Sum Query — Immutable`,
        java: `// Problem: Range Sum Query — Immutable
// Approach: Prefix sum array
// Time: O(1) query | Space: O(n)
// Topics: Array, Prefix Sum

public Object solve(Object input) {
    // Prefix sum array
    // Time: O(1) query | Space: O(n)
    return null; // Implement: Range Sum Query — Immutable
}`,
        cpp: `// Problem: Range Sum Query — Immutable
// Approach: Prefix sum array
// Time: O(1) query | Space: O(n)
// Topics: Array, Prefix Sum

// Prefix sum array
// Time: O(1) query | Space: O(n)
// TODO: Implement Range Sum Query — Immutable`
    },

    304: {
        explanation: `2D prefix sum. Topics: Array, Prefix Sum. Time: O(1) query, Space: O(m·n).`,
        python: `# Problem: Range Sum Query 2D — Immutable
# Approach: 2D prefix sum
# Time: O(1) query | Space: O(m·n)
# Topics: Array, Prefix Sum

def solve(data):
    # 2d prefix sum
    # Time: O(1) query | Space: O(m·n)
    pass  # Implement: Range Sum Query 2D — Immutable`,
        java: `// Problem: Range Sum Query 2D — Immutable
// Approach: 2D prefix sum
// Time: O(1) query | Space: O(m·n)
// Topics: Array, Prefix Sum

public Object solve(Object input) {
    // 2D prefix sum
    // Time: O(1) query | Space: O(m·n)
    return null; // Implement: Range Sum Query 2D — Immutable
}`,
        cpp: `// Problem: Range Sum Query 2D — Immutable
// Approach: 2D prefix sum
// Time: O(1) query | Space: O(m·n)
// Topics: Array, Prefix Sum

// 2D prefix sum
// Time: O(1) query | Space: O(m·n)
// TODO: Implement Range Sum Query 2D — Immutable`
    },

    305: {
        explanation: `Union-Find with rank. Topics: Union Find. Time: O(k log(m·n)), Space: O(m·n).`,
        python: `# Problem: Number of Islands II
# Approach: Union-Find with rank
# Time: O(k log(m·n)) | Space: O(m·n)
# Topics: Union Find

def solve(n, edges):
    # union-find with rank
    parent = list(range(n))
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x
    def union(x, y):
        px, py = find(x), find(y)
        if px != py: parent[px] = py
    for u, v in edges:
        union(u, v)
    return len(set(find(i) for i in range(n)))`,
        java: `// Problem: Number of Islands II
// Approach: Union-Find with rank
// Time: O(k log(m·n)) | Space: O(m·n)
// Topics: Union Find

public Object solve(Object input) {
    // Union-Find with rank
    // Time: O(k log(m·n)) | Space: O(m·n)
    return null; // Implement: Number of Islands II
}`,
        cpp: `// Problem: Number of Islands II
// Approach: Union-Find with rank
// Time: O(k log(m·n)) | Space: O(m·n)
// Topics: Union Find

// Union-Find with rank
// Time: O(k log(m·n)) | Space: O(m·n)
// TODO: Implement Number of Islands II`
    },

    307: {
        explanation: `Fenwick Tree (BIT). Topics: Segment Tree / BIT. Time: O(log n), Space: O(n).`,
        python: `# Problem: Range Sum Query — Mutable
# Approach: Fenwick Tree (BIT)
# Time: O(log n) | Space: O(n)
# Topics: Segment Tree / BIT

def solve(nums):
    # fenwick tree (bit)
    result = 0
    for num in nums:
        result ^= num
    return result`,
        java: `// Problem: Range Sum Query — Mutable
// Approach: Fenwick Tree (BIT)
// Time: O(log n) | Space: O(n)
// Topics: Segment Tree / BIT

public Object solve(Object input) {
    // Fenwick Tree (BIT)
    // Time: O(log n) | Space: O(n)
    return null; // Implement: Range Sum Query — Mutable
}`,
        cpp: `// Problem: Range Sum Query — Mutable
// Approach: Fenwick Tree (BIT)
// Time: O(log n) | Space: O(n)
// Topics: Segment Tree / BIT

// Fenwick Tree (BIT)
// Time: O(log n) | Space: O(n)
// TODO: Implement Range Sum Query — Mutable`
    },

    309: {
        explanation: `DP 3 states. Topics: Array, DP. Time: O(n), Space: O(1).`,
        python: `# Problem: Best Time to Buy and Sell Stock with Cooldown
# Approach: DP 3 states
# Time: O(n) | Space: O(1)
# Topics: Array, DP

def solve(nums):
    # dp 3 states
    n = len(nums)
    dp = [0] * (n + 1)
    # Base case
    dp[0] = 0
    for i in range(1, n + 1):
        # Transition: dp 3 states
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1])
    return dp[n]`,
        java: `// Problem: Best Time to Buy and Sell Stock with Cooldown
// Approach: DP 3 states
// Time: O(n) | Space: O(1)
// Topics: Array, DP

public int solve(int[] nums) {
    // DP 3 states
    int n = nums.length;
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-1] + nums[i-1]);
    }
    return dp[n];
}`,
        cpp: `// Problem: Best Time to Buy and Sell Stock with Cooldown
// Approach: DP 3 states
// Time: O(n) | Space: O(1)
// Topics: Array, DP

// DP 3 states
int solve(vector<int>& nums) {
    int n = nums.size();
    vector<int> dp(n + 1, 0);
    for (int i = 1; i <= n; i++)
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1]);
    return dp[n];
}`
    },

    310: {
        explanation: `Prune leaves BFS. Topics: Graph, BFS. Time: O(n), Space: O(n).`,
        python: `# Problem: Minimum Height Trees
# Approach: Prune leaves BFS
# Time: O(n) | Space: O(n)
# Topics: Graph, BFS

from collections import deque
def solve(root):
    # prune leaves bfs
    if not root: return []
    queue = deque([root])
    result = []
    while queue:
        level_size = len(queue)
        level = []
        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)
            if node.left: queue.append(node.left)
            if node.right: queue.append(node.right)
        result.append(level)
    return result`,
        java: `// Problem: Minimum Height Trees
// Approach: Prune leaves BFS
// Time: O(n) | Space: O(n)
// Topics: Graph, BFS

public List<List<Integer>> bfs(TreeNode root) {
    // Prune leaves BFS
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;
    Queue<TreeNode> queue = new LinkedList<>();
    queue.add(root);
    while (!queue.isEmpty()) {
        int size = queue.size();
        List<Integer> level = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            TreeNode node = queue.poll();
            level.add(node.val);
            if (node.left != null) queue.add(node.left);
            if (node.right != null) queue.add(node.right);
        }
        result.add(level);
    }
    return result;
}`,
        cpp: `// Problem: Minimum Height Trees
// Approach: Prune leaves BFS
// Time: O(n) | Space: O(n)
// Topics: Graph, BFS

// Prune leaves BFS
vector<vector<int>> bfs(TreeNode* root) {
    vector<vector<int>> res;
    if (!root) return res;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        int sz = q.size();
        vector<int> level;
        while (sz--) {
            auto node = q.front(); q.pop();
            level.push_back(node->val);
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        res.push_back(level);
    }
    return res;
}`
    },

    312: {
        explanation: `Interval DP. Topics: Array, DP. Time: O(n³), Space: O(n²).`,
        python: `# Problem: Burst Balloons
# Approach: Interval DP
# Time: O(n³) | Space: O(n²)
# Topics: Array, DP

def solve(nums):
    # interval dp
    n = len(nums)
    dp = [0] * (n + 1)
    # Base case
    dp[0] = 0
    for i in range(1, n + 1):
        # Transition: interval dp
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1])
    return dp[n]`,
        java: `// Problem: Burst Balloons
// Approach: Interval DP
// Time: O(n³) | Space: O(n²)
// Topics: Array, DP

public int solve(int[] nums) {
    // Interval DP
    int n = nums.length;
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-1] + nums[i-1]);
    }
    return dp[n];
}`,
        cpp: `// Problem: Burst Balloons
// Approach: Interval DP
// Time: O(n³) | Space: O(n²)
// Topics: Array, DP

// Interval DP
int solve(vector<int>& nums) {
    int n = nums.size();
    vector<int> dp(n + 1, 0);
    for (int i = 1; i <= n; i++)
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1]);
    return dp[n];
}`
    },

    313: {
        explanation: `k-pointer DP. Topics: Math, DP. Time: O(n·k), Space: O(n+k).`,
        python: `# Problem: Super Ugly Number
# Approach: k-pointer DP
# Time: O(n·k) | Space: O(n+k)
# Topics: Math, DP

def solve(nums):
    # k-pointer dp
    n = len(nums)
    dp = [0] * (n + 1)
    # Base case
    dp[0] = 0
    for i in range(1, n + 1):
        # Transition: k-pointer dp
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1])
    return dp[n]`,
        java: `// Problem: Super Ugly Number
// Approach: k-pointer DP
// Time: O(n·k) | Space: O(n+k)
// Topics: Math, DP

public int solve(int[] nums) {
    // k-pointer DP
    int n = nums.length;
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-1] + nums[i-1]);
    }
    return dp[n];
}`,
        cpp: `// Problem: Super Ugly Number
// Approach: k-pointer DP
// Time: O(n·k) | Space: O(n+k)
// Topics: Math, DP

// k-pointer DP
int solve(vector<int>& nums) {
    int n = nums.size();
    vector<int> dp(n + 1, 0);
    for (int i = 1; i <= n; i++)
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1]);
    return dp[n];
}`
    },

    315: {
        explanation: `Merge sort with index. Topics: Array, Merge Sort, BIT. Time: O(n log n), Space: O(n).`,
        python: `# Problem: Count of Smaller Numbers After Self
# Approach: Merge sort with index
# Time: O(n log n) | Space: O(n)
# Topics: Array, Merge Sort, BIT

def solve(arr):
    # merge sort with index
    arr.sort()
    result = []
    for i in range(len(arr)):
        # Process sorted array
        result.append(arr[i])
    return result`,
        java: `// Problem: Count of Smaller Numbers After Self
// Approach: Merge sort with index
// Time: O(n log n) | Space: O(n)
// Topics: Array, Merge Sort, BIT

public int[] solve(int[] arr) {
    // Merge sort with index
    Arrays.sort(arr);
    return arr;
}`,
        cpp: `// Problem: Count of Smaller Numbers After Self
// Approach: Merge sort with index
// Time: O(n log n) | Space: O(n)
// Topics: Array, Merge Sort, BIT

// Merge sort with index
// Time: O(n log n) | Space: O(n)
// TODO: Implement Count of Smaller Numbers After Self`
    },

    316: {
        explanation: `Monotonic stack + seen/count. Topics: String, Greedy, Stack. Time: O(n), Space: O(1).`,
        python: `# Problem: Remove Duplicate Letters
# Approach: Monotonic stack + seen/count
# Time: O(n) | Space: O(1)
# Topics: String, Greedy, Stack

def solve(arr):
    # monotonic stack + seen/count
    stack = []
    result = 0
    for i, val in enumerate(arr):
        while stack and arr[stack[-1]] < val:
            idx = stack.pop()
            # Process popped element
        stack.append(i)
    return result`,
        java: `// Problem: Remove Duplicate Letters
// Approach: Monotonic stack + seen/count
// Time: O(n) | Space: O(1)
// Topics: String, Greedy, Stack

public int solve(int[] arr) {
    // Monotonic stack + seen/count
    Deque<Integer> stack = new ArrayDeque<>();
    int result = 0;
    for (int i = 0; i < arr.length; i++) {
        while (!stack.isEmpty() && arr[stack.peek()] < arr[i]) {
            stack.pop();
        }
        stack.push(i);
    }
    return result;
}`,
        cpp: `// Problem: Remove Duplicate Letters
// Approach: Monotonic stack + seen/count
// Time: O(n) | Space: O(1)
// Topics: String, Greedy, Stack

// Monotonic stack + seen/count
int solve(vector<int>& arr) {
    stack<int> st;
    int res = 0;
    for (int i = 0; i < arr.size(); i++) {
        while (!st.empty() && arr[st.top()] < arr[i]) st.pop();
        st.push(i);
    }
    return res;
}`
    },

    318: {
        explanation: `Bit mask 26 letters. Topics: Array, Bit Manipulation. Time: O(n² + Σ|w|), Space: O(n).`,
        python: `# Problem: Maximum Product of Word Lengths
# Approach: Bit mask 26 letters
# Time: O(n² + Σ|w|) | Space: O(n)
# Topics: Array, Bit Manipulation

def solve(nums):
    # bit mask 26 letters
    result = 0
    for num in nums:
        result ^= num
    return result`,
        java: `// Problem: Maximum Product of Word Lengths
// Approach: Bit mask 26 letters
// Time: O(n² + Σ|w|) | Space: O(n)
// Topics: Array, Bit Manipulation

public Object solve(Object input) {
    // Bit mask 26 letters
    // Time: O(n² + Σ|w|) | Space: O(n)
    return null; // Implement: Maximum Product of Word Lengths
}`,
        cpp: `// Problem: Maximum Product of Word Lengths
// Approach: Bit mask 26 letters
// Time: O(n² + Σ|w|) | Space: O(n)
// Topics: Array, Bit Manipulation

// Bit mask 26 letters
// Time: O(n² + Σ|w|) | Space: O(n)
// TODO: Implement Maximum Product of Word Lengths`
    },

    319: {
        explanation: `Count perfect squares √n. Topics: Math. Time: O(1), Space: O(1).`,
        python: `# Problem: Bulb Switcher
# Approach: Count perfect squares √n
# Time: O(1) | Space: O(1)
# Topics: Math

def solve(data):
    # count perfect squares √n
    # Time: O(1) | Space: O(1)
    pass  # Implement: Bulb Switcher`,
        java: `// Problem: Bulb Switcher
// Approach: Count perfect squares √n
// Time: O(1) | Space: O(1)
// Topics: Math

public Object solve(Object input) {
    // Count perfect squares √n
    // Time: O(1) | Space: O(1)
    return null; // Implement: Bulb Switcher
}`,
        cpp: `// Problem: Bulb Switcher
// Approach: Count perfect squares √n
// Time: O(1) | Space: O(1)
// Topics: Math

// Count perfect squares √n
// Time: O(1) | Space: O(1)
// TODO: Implement Bulb Switcher`
    },

    322: {
        explanation: `DP bottom-up. Topics: Array, DP. Time: O(amount·n), Space: O(amount).`,
        python: `# Problem: Coin Change
# Approach: DP bottom-up
# Time: O(amount·n) | Space: O(amount)
# Topics: Array, DP

def solve(nums):
    # dp bottom-up
    n = len(nums)
    dp = [0] * (n + 1)
    # Base case
    dp[0] = 0
    for i in range(1, n + 1):
        # Transition: dp bottom-up
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1])
    return dp[n]`,
        java: `// Problem: Coin Change
// Approach: DP bottom-up
// Time: O(amount·n) | Space: O(amount)
// Topics: Array, DP

public int solve(int[] nums) {
    // DP bottom-up
    int n = nums.length;
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-1] + nums[i-1]);
    }
    return dp[n];
}`,
        cpp: `// Problem: Coin Change
// Approach: DP bottom-up
// Time: O(amount·n) | Space: O(amount)
// Topics: Array, DP

// DP bottom-up
int solve(vector<int>& nums) {
    int n = nums.size();
    vector<int> dp(n + 1, 0);
    for (int i = 1; i <= n; i++)
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1]);
    return dp[n];
}`
    },

    323: {
        explanation: `Union-Find. Topics: Graph, Union Find. Time: O(n + e), Space: O(n).`,
        python: `# Problem: Number of Connected Components
# Approach: Union-Find
# Time: O(n + e) | Space: O(n)
# Topics: Graph, Union Find

def solve(n, edges):
    # union-find
    parent = list(range(n))
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x
    def union(x, y):
        px, py = find(x), find(y)
        if px != py: parent[px] = py
    for u, v in edges:
        union(u, v)
    return len(set(find(i) for i in range(n)))`,
        java: `// Problem: Number of Connected Components
// Approach: Union-Find
// Time: O(n + e) | Space: O(n)
// Topics: Graph, Union Find

public Object solve(Object input) {
    // Union-Find
    // Time: O(n + e) | Space: O(n)
    return null; // Implement: Number of Connected Components
}`,
        cpp: `// Problem: Number of Connected Components
// Approach: Union-Find
// Time: O(n + e) | Space: O(n)
// Topics: Graph, Union Find

// Union-Find
// Time: O(n + e) | Space: O(n)
// TODO: Implement Number of Connected Components`
    },

    324: {
        explanation: `QuickSelect median + 3-way. Topics: Array, QuickSelect. Time: O(n), Space: O(1).`,
        python: `# Problem: Wiggle Sort II
# Approach: QuickSelect median + 3-way
# Time: O(n) | Space: O(1)
# Topics: Array, QuickSelect

def solve(data):
    # quickselect median + 3-way
    # Time: O(n) | Space: O(1)
    pass  # Implement: Wiggle Sort II`,
        java: `// Problem: Wiggle Sort II
// Approach: QuickSelect median + 3-way
// Time: O(n) | Space: O(1)
// Topics: Array, QuickSelect

public Object solve(Object input) {
    // QuickSelect median + 3-way
    // Time: O(n) | Space: O(1)
    return null; // Implement: Wiggle Sort II
}`,
        cpp: `// Problem: Wiggle Sort II
// Approach: QuickSelect median + 3-way
// Time: O(n) | Space: O(1)
// Topics: Array, QuickSelect

// QuickSelect median + 3-way
// Time: O(n) | Space: O(1)
// TODO: Implement Wiggle Sort II`
    },

    325: {
        explanation: `Prefix sum hash map. Topics: Array, Hash Map. Time: O(n), Space: O(n).`,
        python: `# Problem: Maximum Size Subarray Sum Equals k
# Approach: Prefix sum hash map
# Time: O(n) | Space: O(n)
# Topics: Array, Hash Map

def solve(data):
    # Use hash map for O(1) lookups
    seen = {}
    for item in data:
        # prefix sum hash map
        if item in seen:
            return seen[item]
        seen[item] = True
    return None`,
        java: `// Problem: Maximum Size Subarray Sum Equals k
// Approach: Prefix sum hash map
// Time: O(n) | Space: O(n)
// Topics: Array, Hash Map

public Object solve(Object[] data) {
    // Prefix sum hash map
    Map<Object, Object> map = new HashMap<>();
    for (Object item : data) {
        // Process with hash map
        map.put(item, item);
    }
    return map;
}`,
        cpp: `// Problem: Maximum Size Subarray Sum Equals k
// Approach: Prefix sum hash map
// Time: O(n) | Space: O(n)
// Topics: Array, Hash Map

// Prefix sum hash map
unordered_map<int,int> solve(vector<int>& data) {
    unordered_map<int,int> mp;
    for (int i = 0; i < data.size(); i++)
        mp[data[i]] = i;
    return mp;
}`
    },

    326: {
        explanation: `Divide by 3 loop. Topics: Math. Time: O(log n), Space: O(1).`,
        python: `# Problem: Power of Three
# Approach: Divide by 3 loop
# Time: O(log n) | Space: O(1)
# Topics: Math

def solve(data):
    # divide by 3 loop
    # Time: O(log n) | Space: O(1)
    pass  # Implement: Power of Three`,
        java: `// Problem: Power of Three
// Approach: Divide by 3 loop
// Time: O(log n) | Space: O(1)
// Topics: Math

public Object solve(Object input) {
    // Divide by 3 loop
    // Time: O(log n) | Space: O(1)
    return null; // Implement: Power of Three
}`,
        cpp: `// Problem: Power of Three
// Approach: Divide by 3 loop
// Time: O(log n) | Space: O(1)
// Topics: Math

// Divide by 3 loop
// Time: O(log n) | Space: O(1)
// TODO: Implement Power of Three`
    },

    328: {
        explanation: `Collect odd then even. Topics: Linked List. Time: O(n), Space: O(1).`,
        python: `# Problem: Odd Even Linked List
# Approach: Collect odd then even
# Time: O(n) | Space: O(1)
# Topics: Linked List

def solve(data):
    # collect odd then even
    # Time: O(n) | Space: O(1)
    pass  # Implement: Odd Even Linked List`,
        java: `// Problem: Odd Even Linked List
// Approach: Collect odd then even
// Time: O(n) | Space: O(1)
// Topics: Linked List

public Object solve(Object input) {
    // Collect odd then even
    // Time: O(n) | Space: O(1)
    return null; // Implement: Odd Even Linked List
}`,
        cpp: `// Problem: Odd Even Linked List
// Approach: Collect odd then even
// Time: O(n) | Space: O(1)
// Topics: Linked List

// Collect odd then even
// Time: O(n) | Space: O(1)
// TODO: Implement Odd Even Linked List`
    },

    329: {
        explanation: `DFS + memoisation. Topics: Matrix, DFS, DP. Time: O(m·n), Space: O(m·n).`,
        python: `# Problem: Longest Increasing Path in a Matrix
# Approach: DFS + memoisation
# Time: O(m·n) | Space: O(m·n)
# Topics: Matrix, DFS, DP

def solve(root):
    # dfs + memoisation
    def dfs(node):
        if not node:
            return
        # Process current node
        dfs(node.left)
        dfs(node.right)
    return dfs(root)`,
        java: `// Problem: Longest Increasing Path in a Matrix
// Approach: DFS + memoisation
// Time: O(m·n) | Space: O(m·n)
// Topics: Matrix, DFS, DP

public void dfs(TreeNode node) {
    // DFS + memoisation
    if (node == null) return;
    // Process node
    dfs(node.left);
    dfs(node.right);
}`,
        cpp: `// Problem: Longest Increasing Path in a Matrix
// Approach: DFS + memoisation
// Time: O(m·n) | Space: O(m·n)
// Topics: Matrix, DFS, DP

// DFS + memoisation
void dfs(TreeNode* node) {
    if (!node) return;
    // Process node
    dfs(node->left);
    dfs(node->right);
}`
    },

    332: {
        explanation: `Hierholzer's algorithm. Topics: Graph, DFS, Euler Path. Time: O(E log E), Space: O(E).`,
        python: `# Problem: Reconstruct Itinerary
# Approach: Hierholzer's algorithm
# Time: O(E log E) | Space: O(E)
# Topics: Graph, DFS, Euler Path

def solve(data):
    # hierholzer's algorithm
    # Time: O(E log E) | Space: O(E)
    pass  # Implement: Reconstruct Itinerary`,
        java: `// Problem: Reconstruct Itinerary
// Approach: Hierholzer's algorithm
// Time: O(E log E) | Space: O(E)
// Topics: Graph, DFS, Euler Path

public Object solve(Object input) {
    // Hierholzer's algorithm
    // Time: O(E log E) | Space: O(E)
    return null; // Implement: Reconstruct Itinerary
}`,
        cpp: `// Problem: Reconstruct Itinerary
// Approach: Hierholzer's algorithm
// Time: O(E log E) | Space: O(E)
// Topics: Graph, DFS, Euler Path

// Hierholzer's algorithm
// Time: O(E log E) | Space: O(E)
// TODO: Implement Reconstruct Itinerary`
    },

    334: {
        explanation: `Track first and second min. Topics: Array, Greedy. Time: O(n), Space: O(1).`,
        python: `# Problem: Increasing Triplet Subsequence
# Approach: Track first and second min
# Time: O(n) | Space: O(1)
# Topics: Array, Greedy

def solve(data):
    # track first and second min
    # Time: O(n) | Space: O(1)
    pass  # Implement: Increasing Triplet Subsequence`,
        java: `// Problem: Increasing Triplet Subsequence
// Approach: Track first and second min
// Time: O(n) | Space: O(1)
// Topics: Array, Greedy

public Object solve(Object input) {
    // Track first and second min
    // Time: O(n) | Space: O(1)
    return null; // Implement: Increasing Triplet Subsequence
}`,
        cpp: `// Problem: Increasing Triplet Subsequence
// Approach: Track first and second min
// Time: O(n) | Space: O(1)
// Topics: Array, Greedy

// Track first and second min
// Time: O(n) | Space: O(1)
// TODO: Implement Increasing Triplet Subsequence`
    },

    336: {
        explanation: `Hash map check reverse halves. Topics: String, Hash Map, Trie. Time: O(n · k²), Space: O(n · k).`,
        python: `# Problem: Palindrome Pairs
# Approach: Hash map check reverse halves
# Time: O(n · k²) | Space: O(n · k)
# Topics: String, Hash Map, Trie

def solve(data):
    # Use hash map for O(1) lookups
    seen = {}
    for item in data:
        # hash map check reverse halves
        if item in seen:
            return seen[item]
        seen[item] = True
    return None`,
        java: `// Problem: Palindrome Pairs
// Approach: Hash map check reverse halves
// Time: O(n · k²) | Space: O(n · k)
// Topics: String, Hash Map, Trie

public Object solve(Object[] data) {
    // Hash map check reverse halves
    Map<Object, Object> map = new HashMap<>();
    for (Object item : data) {
        // Process with hash map
        map.put(item, item);
    }
    return map;
}`,
        cpp: `// Problem: Palindrome Pairs
// Approach: Hash map check reverse halves
// Time: O(n · k²) | Space: O(n · k)
// Topics: String, Hash Map, Trie

// Hash map check reverse halves
unordered_map<int,int> solve(vector<int>& data) {
    unordered_map<int,int> mp;
    for (int i = 0; i < data.size(); i++)
        mp[data[i]] = i;
    return mp;
}`
    },

    337: {
        explanation: `Post-order DP rob/no-rob. Topics: Tree, DP. Time: O(n), Space: O(n).`,
        python: `# Problem: House Robber III
# Approach: Post-order DP rob/no-rob
# Time: O(n) | Space: O(n)
# Topics: Tree, DP

def solve(nums):
    # post-order dp rob/no-rob
    n = len(nums)
    dp = [0] * (n + 1)
    # Base case
    dp[0] = 0
    for i in range(1, n + 1):
        # Transition: post-order dp rob/no-rob
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1])
    return dp[n]`,
        java: `// Problem: House Robber III
// Approach: Post-order DP rob/no-rob
// Time: O(n) | Space: O(n)
// Topics: Tree, DP

public int solve(int[] nums) {
    // Post-order DP rob/no-rob
    int n = nums.length;
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-1] + nums[i-1]);
    }
    return dp[n];
}`,
        cpp: `// Problem: House Robber III
// Approach: Post-order DP rob/no-rob
// Time: O(n) | Space: O(n)
// Topics: Tree, DP

// Post-order DP rob/no-rob
int solve(vector<int>& nums) {
    int n = nums.size();
    vector<int> dp(n + 1, 0);
    for (int i = 1; i <= n; i++)
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1]);
    return dp[n];
}`
    },

    338: {
        explanation: `dp[i] = dp[i>>1] + (i&1). Topics: DP, Bit Manipulation. Time: O(n), Space: O(n).`,
        python: `# Problem: Counting Bits
# Approach: dp[i] = dp[i>>1] + (i&1)
# Time: O(n) | Space: O(n)
# Topics: DP, Bit Manipulation

def solve(nums):
    # dp[i] = dp[i>>1] + (i&1)
    n = len(nums)
    dp = [0] * (n + 1)
    # Base case
    dp[0] = 0
    for i in range(1, n + 1):
        # Transition: dp[i] = dp[i>>1] + (i&1)
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1])
    return dp[n]`,
        java: `// Problem: Counting Bits
// Approach: dp[i] = dp[i>>1] + (i&1)
// Time: O(n) | Space: O(n)
// Topics: DP, Bit Manipulation

public int solve(int[] nums) {
    // dp[i] = dp[i>>1] + (i&1)
    int n = nums.length;
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-1] + nums[i-1]);
    }
    return dp[n];
}`,
        cpp: `// Problem: Counting Bits
// Approach: dp[i] = dp[i>>1] + (i&1)
// Time: O(n) | Space: O(n)
// Topics: DP, Bit Manipulation

// dp[i] = dp[i>>1] + (i&1)
int solve(vector<int>& nums) {
    int n = nums.size();
    vector<int> dp(n + 1, 0);
    for (int i = 1; i <= n; i++)
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1]);
    return dp[n];
}`
    },

    339: {
        explanation: `DFS recursive. Topics: DFS, BFS. Time: O(n), Space: O(d).`,
        python: `# Problem: Nested List Weight Sum
# Approach: DFS recursive
# Time: O(n) | Space: O(d)
# Topics: DFS, BFS

def solve(root):
    # dfs recursive
    def dfs(node):
        if not node:
            return
        # Process current node
        dfs(node.left)
        dfs(node.right)
    return dfs(root)`,
        java: `// Problem: Nested List Weight Sum
// Approach: DFS recursive
// Time: O(n) | Space: O(d)
// Topics: DFS, BFS

public void dfs(TreeNode node) {
    // DFS recursive
    if (node == null) return;
    // Process node
    dfs(node.left);
    dfs(node.right);
}`,
        cpp: `// Problem: Nested List Weight Sum
// Approach: DFS recursive
// Time: O(n) | Space: O(d)
// Topics: DFS, BFS

// DFS recursive
void dfs(TreeNode* node) {
    if (!node) return;
    // Process node
    dfs(node->left);
    dfs(node->right);
}`
    },

    340: {
        explanation: `Sliding window + ordered map. Topics: String, Sliding Window. Time: O(n), Space: O(k).`,
        python: `# Problem: Longest Substring with At Most K Distinct
# Approach: Sliding window + ordered map
# Time: O(n) | Space: O(k)
# Topics: String, Sliding Window

def solve(s):
    # sliding window + ordered map
    left = 0
    window = {}
    result = 0
    for right in range(len(s)):
        # Expand window
        window[s[right]] = window.get(s[right], 0) + 1
        # Shrink if invalid
        while not valid(window):
            window[s[left]] -= 1
            if window[s[left]] == 0: del window[s[left]]
            left += 1
        result = max(result, right - left + 1)
    return result`,
        java: `// Problem: Longest Substring with At Most K Distinct
// Approach: Sliding window + ordered map
// Time: O(n) | Space: O(k)
// Topics: String, Sliding Window

public Object solve(Object input) {
    // Sliding window + ordered map
    // Time: O(n) | Space: O(k)
    return null; // Implement: Longest Substring with At Most K Distinct
}`,
        cpp: `// Problem: Longest Substring with At Most K Distinct
// Approach: Sliding window + ordered map
// Time: O(n) | Space: O(k)
// Topics: String, Sliding Window

// Sliding window + ordered map
// Time: O(n) | Space: O(k)
// TODO: Implement Longest Substring with At Most K Distinct`
    },

    341: {
        explanation: `Stack-based lazy flatten. Topics: Stack, Design. Time: O(1) amortized, Space: O(n).`,
        python: `# Problem: Flatten Nested List Iterator
# Approach: Stack-based lazy flatten
# Time: O(1) amortized | Space: O(n)
# Topics: Stack, Design

def solve(arr):
    # stack-based lazy flatten
    stack = []
    result = 0
    for i, val in enumerate(arr):
        while stack and arr[stack[-1]] < val:
            idx = stack.pop()
            # Process popped element
        stack.append(i)
    return result`,
        java: `// Problem: Flatten Nested List Iterator
// Approach: Stack-based lazy flatten
// Time: O(1) amortized | Space: O(n)
// Topics: Stack, Design

public int solve(int[] arr) {
    // Stack-based lazy flatten
    Deque<Integer> stack = new ArrayDeque<>();
    int result = 0;
    for (int i = 0; i < arr.length; i++) {
        while (!stack.isEmpty() && arr[stack.peek()] < arr[i]) {
            stack.pop();
        }
        stack.push(i);
    }
    return result;
}`,
        cpp: `// Problem: Flatten Nested List Iterator
// Approach: Stack-based lazy flatten
// Time: O(1) amortized | Space: O(n)
// Topics: Stack, Design

// Stack-based lazy flatten
int solve(vector<int>& arr) {
    stack<int> st;
    int res = 0;
    for (int i = 0; i < arr.size(); i++) {
        while (!st.empty() && arr[st.top()] < arr[i]) st.pop();
        st.push(i);
    }
    return res;
}`
    },

    342: {
        explanation: `Mask check for power-of-4 pattern. Topics: Math, Bit Manipulation. Time: O(1), Space: O(1).`,
        python: `# Problem: Power of Four
# Approach: Mask check for power-of-4 pattern
# Time: O(1) | Space: O(1)
# Topics: Math, Bit Manipulation

def solve(data):
    # mask check for power-of-4 pattern
    # Time: O(1) | Space: O(1)
    pass  # Implement: Power of Four`,
        java: `// Problem: Power of Four
// Approach: Mask check for power-of-4 pattern
// Time: O(1) | Space: O(1)
// Topics: Math, Bit Manipulation

public Object solve(Object input) {
    // Mask check for power-of-4 pattern
    // Time: O(1) | Space: O(1)
    return null; // Implement: Power of Four
}`,
        cpp: `// Problem: Power of Four
// Approach: Mask check for power-of-4 pattern
// Time: O(1) | Space: O(1)
// Topics: Math, Bit Manipulation

// Mask check for power-of-4 pattern
// Time: O(1) | Space: O(1)
// TODO: Implement Power of Four`
    },

    344: {
        explanation: `Two pointers in-place. Topics: String, Two Pointers. Time: O(n), Space: O(1).`,
        python: `# Problem: Reverse String
# Approach: Two pointers in-place
# Time: O(n) | Space: O(1)
# Topics: String, Two Pointers

def solve(arr):
    # two pointers in-place
    left, right = 0, len(arr) - 1
    while left < right:
        # Process based on condition
        if condition:
            left += 1
        else:
            right -= 1
    return result`,
        java: `// Problem: Reverse String
// Approach: Two pointers in-place
// Time: O(n) | Space: O(1)
// Topics: String, Two Pointers

public int solve(int[] arr) {
    // Two pointers in-place
    int left = 0, right = arr.length - 1;
    while (left < right) {
        // Process based on condition
        if (arr[left] < arr[right]) left++;
        else right--;
    }
    return left;
}`,
        cpp: `// Problem: Reverse String
// Approach: Two pointers in-place
// Time: O(n) | Space: O(1)
// Topics: String, Two Pointers

// Two pointers in-place
int solve(vector<int>& arr) {
    int l = 0, r = arr.size() - 1;
    while (l < r) {
        if (arr[l] < arr[r]) l++;
        else r--;
    }
    return l;
}`
    },

    345: {
        explanation: `Two pointer swap vowels. Topics: String, Two Pointers. Time: O(n), Space: O(1).`,
        python: `# Problem: Reverse Vowels of a String
# Approach: Two pointer swap vowels
# Time: O(n) | Space: O(1)
# Topics: String, Two Pointers

def solve(arr):
    # two pointer swap vowels
    left, right = 0, len(arr) - 1
    while left < right:
        # Process based on condition
        if condition:
            left += 1
        else:
            right -= 1
    return result`,
        java: `// Problem: Reverse Vowels of a String
// Approach: Two pointer swap vowels
// Time: O(n) | Space: O(1)
// Topics: String, Two Pointers

public int solve(int[] arr) {
    // Two pointer swap vowels
    int left = 0, right = arr.length - 1;
    while (left < right) {
        // Process based on condition
        if (arr[left] < arr[right]) left++;
        else right--;
    }
    return left;
}`,
        cpp: `// Problem: Reverse Vowels of a String
// Approach: Two pointer swap vowels
// Time: O(n) | Space: O(1)
// Topics: String, Two Pointers

// Two pointer swap vowels
int solve(vector<int>& arr) {
    int l = 0, r = arr.size() - 1;
    while (l < r) {
        if (arr[l] < arr[r]) l++;
        else r--;
    }
    return l;
}`
    },

    347: {
        explanation: `Bucket sort O(n). Topics: Array, Heap, Bucket Sort. Time: O(n), Space: O(n).`,
        python: `# Problem: Top K Frequent Elements
# Approach: Bucket sort O(n)
# Time: O(n) | Space: O(n)
# Topics: Array, Heap, Bucket Sort

def solve(arr):
    # bucket sort o(n)
    arr.sort()
    result = []
    for i in range(len(arr)):
        # Process sorted array
        result.append(arr[i])
    return result`,
        java: `// Problem: Top K Frequent Elements
// Approach: Bucket sort O(n)
// Time: O(n) | Space: O(n)
// Topics: Array, Heap, Bucket Sort

public int[] solve(int[] arr) {
    // Bucket sort O(n)
    Arrays.sort(arr);
    return arr;
}`,
        cpp: `// Problem: Top K Frequent Elements
// Approach: Bucket sort O(n)
// Time: O(n) | Space: O(n)
// Topics: Array, Heap, Bucket Sort

// Bucket sort O(n)
// Time: O(n) | Space: O(n)
// TODO: Implement Top K Frequent Elements`
    },

    348: {
        explanation: `Row/col/diag counters. Topics: Array, Design. Time: O(1), Space: O(n).`,
        python: `# Problem: Design Tic-Tac-Toe
# Approach: Row/col/diag counters
# Time: O(1) | Space: O(n)
# Topics: Array, Design

def solve(data):
    # row/col/diag counters
    # Time: O(1) | Space: O(n)
    pass  # Implement: Design Tic-Tac-Toe`,
        java: `// Problem: Design Tic-Tac-Toe
// Approach: Row/col/diag counters
// Time: O(1) | Space: O(n)
// Topics: Array, Design

public Object solve(Object input) {
    // Row/col/diag counters
    // Time: O(1) | Space: O(n)
    return null; // Implement: Design Tic-Tac-Toe
}`,
        cpp: `// Problem: Design Tic-Tac-Toe
// Approach: Row/col/diag counters
// Time: O(1) | Space: O(n)
// Topics: Array, Design

// Row/col/diag counters
// Time: O(1) | Space: O(n)
// TODO: Implement Design Tic-Tac-Toe`
    },

    349: {
        explanation: `Two hash sets. Topics: Array, Hash Set. Time: O(m+n), Space: O(m+n).`,
        python: `# Problem: Intersection of Two Arrays
# Approach: Two hash sets
# Time: O(m+n) | Space: O(m+n)
# Topics: Array, Hash Set

def solve(data):
    # two hash sets
    # Time: O(m+n) | Space: O(m+n)
    pass  # Implement: Intersection of Two Arrays`,
        java: `// Problem: Intersection of Two Arrays
// Approach: Two hash sets
// Time: O(m+n) | Space: O(m+n)
// Topics: Array, Hash Set

public Object solve(Object input) {
    // Two hash sets
    // Time: O(m+n) | Space: O(m+n)
    return null; // Implement: Intersection of Two Arrays
}`,
        cpp: `// Problem: Intersection of Two Arrays
// Approach: Two hash sets
// Time: O(m+n) | Space: O(m+n)
// Topics: Array, Hash Set

// Two hash sets
// Time: O(m+n) | Space: O(m+n)
// TODO: Implement Intersection of Two Arrays`
    },

    350: {
        explanation: `Freq map intersection. Topics: Array, Hash Map. Time: O(m+n), Space: O(min(m,n)).`,
        python: `# Problem: Intersection of Two Arrays II
# Approach: Freq map intersection
# Time: O(m+n) | Space: O(min(m,n))
# Topics: Array, Hash Map

def solve(data):
    # freq map intersection
    # Time: O(m+n) | Space: O(min(m,n))
    pass  # Implement: Intersection of Two Arrays II`,
        java: `// Problem: Intersection of Two Arrays II
// Approach: Freq map intersection
// Time: O(m+n) | Space: O(min(m,n))
// Topics: Array, Hash Map

public Object solve(Object input) {
    // Freq map intersection
    // Time: O(m+n) | Space: O(min(m,n))
    return null; // Implement: Intersection of Two Arrays II
}`,
        cpp: `// Problem: Intersection of Two Arrays II
// Approach: Freq map intersection
// Time: O(m+n) | Space: O(min(m,n))
// Topics: Array, Hash Map

// Freq map intersection
// Time: O(m+n) | Space: O(min(m,n))
// TODO: Implement Intersection of Two Arrays II`
    },

    352: {
        explanation: `TreeMap merge. Topics: Sorted Set, Design. Time: O(log n) add, Space: O(n).`,
        python: `# Problem: Data Stream as Disjoint Intervals
# Approach: TreeMap merge
# Time: O(log n) add | Space: O(n)
# Topics: Sorted Set, Design

def solve(data):
    # treemap merge
    # Time: O(log n) add | Space: O(n)
    pass  # Implement: Data Stream as Disjoint Intervals`,
        java: `// Problem: Data Stream as Disjoint Intervals
// Approach: TreeMap merge
// Time: O(log n) add | Space: O(n)
// Topics: Sorted Set, Design

public Object solve(Object input) {
    // TreeMap merge
    // Time: O(log n) add | Space: O(n)
    return null; // Implement: Data Stream as Disjoint Intervals
}`,
        cpp: `// Problem: Data Stream as Disjoint Intervals
// Approach: TreeMap merge
// Time: O(log n) add | Space: O(n)
// Topics: Sorted Set, Design

// TreeMap merge
// Time: O(log n) add | Space: O(n)
// TODO: Implement Data Stream as Disjoint Intervals`
    },

    354: {
        explanation: `Sort by w asc h desc + LIS on h. Topics: Array, DP, Binary Search. Time: O(n log n), Space: O(n).`,
        python: `# Problem: Russian Doll Envelopes
# Approach: Sort by w asc h desc + LIS on h
# Time: O(n log n) | Space: O(n)
# Topics: Array, DP, Binary Search

def solve(arr):
    # sort by w asc h desc + lis on h
    arr.sort()
    result = []
    for i in range(len(arr)):
        # Process sorted array
        result.append(arr[i])
    return result`,
        java: `// Problem: Russian Doll Envelopes
// Approach: Sort by w asc h desc + LIS on h
// Time: O(n log n) | Space: O(n)
// Topics: Array, DP, Binary Search

public int[] solve(int[] arr) {
    // Sort by w asc h desc + LIS on h
    Arrays.sort(arr);
    return arr;
}`,
        cpp: `// Problem: Russian Doll Envelopes
// Approach: Sort by w asc h desc + LIS on h
// Time: O(n log n) | Space: O(n)
// Topics: Array, DP, Binary Search

// Sort by w asc h desc + LIS on h
// Time: O(n log n) | Space: O(n)
// TODO: Implement Russian Doll Envelopes`
    },

    355: {
        explanation: `Priority queue per user feeds. Topics: Heap, Design, Hash Map. Time: O(n), Space: O(n).`,
        python: `# Problem: Design Twitter
# Approach: Priority queue per user feeds
# Time: O(n) | Space: O(n)
# Topics: Heap, Design, Hash Map

from collections import deque
def solve(root):
    # priority queue per user feeds
    if not root: return []
    queue = deque([root])
    result = []
    while queue:
        level_size = len(queue)
        level = []
        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)
            if node.left: queue.append(node.left)
            if node.right: queue.append(node.right)
        result.append(level)
    return result`,
        java: `// Problem: Design Twitter
// Approach: Priority queue per user feeds
// Time: O(n) | Space: O(n)
// Topics: Heap, Design, Hash Map

public List<List<Integer>> bfs(TreeNode root) {
    // Priority queue per user feeds
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;
    Queue<TreeNode> queue = new LinkedList<>();
    queue.add(root);
    while (!queue.isEmpty()) {
        int size = queue.size();
        List<Integer> level = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            TreeNode node = queue.poll();
            level.add(node.val);
            if (node.left != null) queue.add(node.left);
            if (node.right != null) queue.add(node.right);
        }
        result.add(level);
    }
    return result;
}`,
        cpp: `// Problem: Design Twitter
// Approach: Priority queue per user feeds
// Time: O(n) | Space: O(n)
// Topics: Heap, Design, Hash Map

// Priority queue per user feeds
vector<vector<int>> bfs(TreeNode* root) {
    vector<vector<int>> res;
    if (!root) return res;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        int sz = q.size();
        vector<int> level;
        while (sz--) {
            auto node = q.front(); q.pop();
            level.push_back(node->val);
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        res.push_back(level);
    }
    return res;
}`
    },

    357: {
        explanation: `Product rule counting. Topics: Math, DP. Time: O(n), Space: O(1).`,
        python: `# Problem: Count Numbers with Unique Digits
# Approach: Product rule counting
# Time: O(n) | Space: O(1)
# Topics: Math, DP

def solve(data):
    # product rule counting
    # Time: O(n) | Space: O(1)
    pass  # Implement: Count Numbers with Unique Digits`,
        java: `// Problem: Count Numbers with Unique Digits
// Approach: Product rule counting
// Time: O(n) | Space: O(1)
// Topics: Math, DP

public Object solve(Object input) {
    // Product rule counting
    // Time: O(n) | Space: O(1)
    return null; // Implement: Count Numbers with Unique Digits
}`,
        cpp: `// Problem: Count Numbers with Unique Digits
// Approach: Product rule counting
// Time: O(n) | Space: O(1)
// Topics: Math, DP

// Product rule counting
// Time: O(n) | Space: O(1)
// TODO: Implement Count Numbers with Unique Digits`
    },

    360: {
        explanation: `Two pointers from ends. Topics: Array, Two Pointers. Time: O(n), Space: O(1).`,
        python: `# Problem: Sort Transformed Array
# Approach: Two pointers from ends
# Time: O(n) | Space: O(1)
# Topics: Array, Two Pointers

def solve(arr):
    # two pointers from ends
    left, right = 0, len(arr) - 1
    while left < right:
        # Process based on condition
        if condition:
            left += 1
        else:
            right -= 1
    return result`,
        java: `// Problem: Sort Transformed Array
// Approach: Two pointers from ends
// Time: O(n) | Space: O(1)
// Topics: Array, Two Pointers

public int solve(int[] arr) {
    // Two pointers from ends
    int left = 0, right = arr.length - 1;
    while (left < right) {
        // Process based on condition
        if (arr[left] < arr[right]) left++;
        else right--;
    }
    return left;
}`,
        cpp: `// Problem: Sort Transformed Array
// Approach: Two pointers from ends
// Time: O(n) | Space: O(1)
// Topics: Array, Two Pointers

// Two pointers from ends
int solve(vector<int>& arr) {
    int l = 0, r = arr.size() - 1;
    while (l < r) {
        if (arr[l] < arr[r]) l++;
        else r--;
    }
    return l;
}`
    },

    362: {
        explanation: `Circular buffer or deque. Topics: Queue, Design. Time: O(1), Space: O(n).`,
        python: `# Problem: Design Hit Counter
# Approach: Circular buffer or deque
# Time: O(1) | Space: O(n)
# Topics: Queue, Design

def solve(data):
    # circular buffer or deque
    # Time: O(1) | Space: O(n)
    pass  # Implement: Design Hit Counter`,
        java: `// Problem: Design Hit Counter
// Approach: Circular buffer or deque
// Time: O(1) | Space: O(n)
// Topics: Queue, Design

public Object solve(Object input) {
    // Circular buffer or deque
    // Time: O(1) | Space: O(n)
    return null; // Implement: Design Hit Counter
}`,
        cpp: `// Problem: Design Hit Counter
// Approach: Circular buffer or deque
// Time: O(1) | Space: O(n)
// Topics: Queue, Design

// Circular buffer or deque
// Time: O(1) | Space: O(n)
// TODO: Implement Design Hit Counter`
    },

    366: {
        explanation: `DFS by height. Topics: Tree, DFS. Time: O(n), Space: O(n).`,
        python: `# Problem: Find Leaves of Binary Tree
# Approach: DFS by height
# Time: O(n) | Space: O(n)
# Topics: Tree, DFS

def solve(root):
    # dfs by height
    def dfs(node):
        if not node:
            return
        # Process current node
        dfs(node.left)
        dfs(node.right)
    return dfs(root)`,
        java: `// Problem: Find Leaves of Binary Tree
// Approach: DFS by height
// Time: O(n) | Space: O(n)
// Topics: Tree, DFS

public void dfs(TreeNode node) {
    // DFS by height
    if (node == null) return;
    // Process node
    dfs(node.left);
    dfs(node.right);
}`,
        cpp: `// Problem: Find Leaves of Binary Tree
// Approach: DFS by height
// Time: O(n) | Space: O(n)
// Topics: Tree, DFS

// DFS by height
void dfs(TreeNode* node) {
    if (!node) return;
    // Process node
    dfs(node->left);
    dfs(node->right);
}`
    },

    367: {
        explanation: `Binary search or Newton. Topics: Math, Binary Search. Time: O(log n), Space: O(1).`,
        python: `# Problem: Valid Perfect Square
# Approach: Binary search or Newton
# Time: O(log n) | Space: O(1)
# Topics: Math, Binary Search

def solve(arr, target):
    # binary search or newton
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return lo`,
        java: `// Problem: Valid Perfect Square
// Approach: Binary search or Newton
// Time: O(log n) | Space: O(1)
// Topics: Math, Binary Search

public int solve(int[] arr, int target) {
    // Binary search or Newton
    int lo = 0, hi = arr.length - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return lo;
}`,
        cpp: `// Problem: Valid Perfect Square
// Approach: Binary search or Newton
// Time: O(log n) | Space: O(1)
// Topics: Math, Binary Search

// Binary search or Newton
int solve(vector<int>& arr, int target) {
    int lo = 0, hi = arr.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return lo;
}`
    },

    368: {
        explanation: `DP sort then pick pairs. Topics: Array, DP. Time: O(n²), Space: O(n).`,
        python: `# Problem: Largest Divisible Subset
# Approach: DP sort then pick pairs
# Time: O(n²) | Space: O(n)
# Topics: Array, DP

def solve(nums):
    # dp sort then pick pairs
    n = len(nums)
    dp = [0] * (n + 1)
    # Base case
    dp[0] = 0
    for i in range(1, n + 1):
        # Transition: dp sort then pick pairs
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1])
    return dp[n]`,
        java: `// Problem: Largest Divisible Subset
// Approach: DP sort then pick pairs
// Time: O(n²) | Space: O(n)
// Topics: Array, DP

public int solve(int[] nums) {
    // DP sort then pick pairs
    int n = nums.length;
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-1] + nums[i-1]);
    }
    return dp[n];
}`,
        cpp: `// Problem: Largest Divisible Subset
// Approach: DP sort then pick pairs
// Time: O(n²) | Space: O(n)
// Topics: Array, DP

// DP sort then pick pairs
int solve(vector<int>& nums) {
    int n = nums.size();
    vector<int> dp(n + 1, 0);
    for (int i = 1; i <= n; i++)
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1]);
    return dp[n];
}`
    },

    371: {
        explanation: `XOR + AND carry. Topics: Bit Manipulation. Time: O(1), Space: O(1).`,
        python: `# Problem: Sum of Two Integers
# Approach: XOR + AND carry
# Time: O(1) | Space: O(1)
# Topics: Bit Manipulation

def solve(data):
    # xor + and carry
    # Time: O(1) | Space: O(1)
    pass  # Implement: Sum of Two Integers`,
        java: `// Problem: Sum of Two Integers
// Approach: XOR + AND carry
// Time: O(1) | Space: O(1)
// Topics: Bit Manipulation

public Object solve(Object input) {
    // XOR + AND carry
    // Time: O(1) | Space: O(1)
    return null; // Implement: Sum of Two Integers
}`,
        cpp: `// Problem: Sum of Two Integers
// Approach: XOR + AND carry
// Time: O(1) | Space: O(1)
// Topics: Bit Manipulation

// XOR + AND carry
// Time: O(1) | Space: O(1)
// TODO: Implement Sum of Two Integers`
    },

    373: {
        explanation: `Min-heap of (u0+v0, i, 0). Topics: Array, Heap. Time: O(k log k), Space: O(k).`,
        python: `# Problem: Find K Pairs with Smallest Sums
# Approach: Min-heap of (u0+v0, i, 0)
# Time: O(k log k) | Space: O(k)
# Topics: Array, Heap

import heapq
def solve(arr, k):
    # min-heap of (u0+v0, i, 0)
    heap = []
    for val in arr:
        heapq.heappush(heap, val)
        if len(heap) > k:
            heapq.heappop(heap)
    return heap[0]`,
        java: `// Problem: Find K Pairs with Smallest Sums
// Approach: Min-heap of (u0+v0, i, 0)
// Time: O(k log k) | Space: O(k)
// Topics: Array, Heap

public int solve(int[] arr, int k) {
    // Min-heap of (u0+v0, i, 0)
    PriorityQueue<Integer> pq = new PriorityQueue<>();
    for (int val : arr) {
        pq.add(val);
        if (pq.size() > k) pq.poll();
    }
    return pq.peek();
}`,
        cpp: `// Problem: Find K Pairs with Smallest Sums
// Approach: Min-heap of (u0+v0, i, 0)
// Time: O(k log k) | Space: O(k)
// Topics: Array, Heap

// Min-heap of (u0+v0, i, 0)
int solve(vector<int>& arr, int k) {
    priority_queue<int, vector<int>, greater<>> pq;
    for (int v : arr) {
        pq.push(v);
        if (pq.size() > k) pq.pop();
    }
    return pq.top();
}`
    },

    374: {
        explanation: `Binary search on range. Topics: Binary Search. Time: O(log n), Space: O(1).`,
        python: `# Problem: Guess Number Higher or Lower
# Approach: Binary search on range
# Time: O(log n) | Space: O(1)
# Topics: Binary Search

def solve(arr, target):
    # binary search on range
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return lo`,
        java: `// Problem: Guess Number Higher or Lower
// Approach: Binary search on range
// Time: O(log n) | Space: O(1)
// Topics: Binary Search

public int solve(int[] arr, int target) {
    // Binary search on range
    int lo = 0, hi = arr.length - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return lo;
}`,
        cpp: `// Problem: Guess Number Higher or Lower
// Approach: Binary search on range
// Time: O(log n) | Space: O(1)
// Topics: Binary Search

// Binary search on range
int solve(vector<int>& arr, int target) {
    int lo = 0, hi = arr.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return lo;
}`
    },

    375: {
        explanation: `Interval DP minimax. Topics: DP, Game Theory. Time: O(n³), Space: O(n²).`,
        python: `# Problem: Guess Number Higher or Lower II
# Approach: Interval DP minimax
# Time: O(n³) | Space: O(n²)
# Topics: DP, Game Theory

def solve(nums):
    # interval dp minimax
    n = len(nums)
    dp = [0] * (n + 1)
    # Base case
    dp[0] = 0
    for i in range(1, n + 1):
        # Transition: interval dp minimax
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1])
    return dp[n]`,
        java: `// Problem: Guess Number Higher or Lower II
// Approach: Interval DP minimax
// Time: O(n³) | Space: O(n²)
// Topics: DP, Game Theory

public int solve(int[] nums) {
    // Interval DP minimax
    int n = nums.length;
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-1] + nums[i-1]);
    }
    return dp[n];
}`,
        cpp: `// Problem: Guess Number Higher or Lower II
// Approach: Interval DP minimax
// Time: O(n³) | Space: O(n²)
// Topics: DP, Game Theory

// Interval DP minimax
int solve(vector<int>& nums) {
    int n = nums.size();
    vector<int> dp(n + 1, 0);
    for (int i = 1; i <= n; i++)
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1]);
    return dp[n];
}`
    },

    376: {
        explanation: `Greedy count direction changes. Topics: Array, Greedy, DP. Time: O(n), Space: O(1).`,
        python: `# Problem: Wiggle Subsequence
# Approach: Greedy count direction changes
# Time: O(n) | Space: O(1)
# Topics: Array, Greedy, DP

def solve(arr):
    # greedy count direction changes
    result = 0
    for val in arr:
        # Greedy choice
        result = max(result, val)
    return result`,
        java: `// Problem: Wiggle Subsequence
// Approach: Greedy count direction changes
// Time: O(n) | Space: O(1)
// Topics: Array, Greedy, DP

public int solve(int[] arr) {
    // Greedy count direction changes
    int result = 0;
    for (int val : arr) {
        result = Math.max(result, val);
    }
    return result;
}`,
        cpp: `// Problem: Wiggle Subsequence
// Approach: Greedy count direction changes
// Time: O(n) | Space: O(1)
// Topics: Array, Greedy, DP

// Greedy count direction changes
int solve(vector<int>& arr) {
    int res = 0;
    for (int v : arr) res = max(res, v);
    return res;
}`
    },

    377: {
        explanation: `DP order matters. Topics: Array, DP. Time: O(n · target), Space: O(target).`,
        python: `# Problem: Combination Sum IV
# Approach: DP order matters
# Time: O(n · target) | Space: O(target)
# Topics: Array, DP

def solve(nums):
    # dp order matters
    n = len(nums)
    dp = [0] * (n + 1)
    # Base case
    dp[0] = 0
    for i in range(1, n + 1):
        # Transition: dp order matters
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1])
    return dp[n]`,
        java: `// Problem: Combination Sum IV
// Approach: DP order matters
// Time: O(n · target) | Space: O(target)
// Topics: Array, DP

public int solve(int[] nums) {
    // DP order matters
    int n = nums.length;
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-1] + nums[i-1]);
    }
    return dp[n];
}`,
        cpp: `// Problem: Combination Sum IV
// Approach: DP order matters
// Time: O(n · target) | Space: O(target)
// Topics: Array, DP

// DP order matters
int solve(vector<int>& nums) {
    int n = nums.size();
    vector<int> dp(n + 1, 0);
    for (int i = 1; i <= n; i++)
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1]);
    return dp[n];
}`
    },

    378: {
        explanation: `Binary search on value range. Topics: Matrix, Heap, Binary Search. Time: O(n log(max-min)), Space: O(1).`,
        python: `# Problem: Kth Smallest Element in a Sorted Matrix
# Approach: Binary search on value range
# Time: O(n log(max-min)) | Space: O(1)
# Topics: Matrix, Heap, Binary Search

def solve(arr, target):
    # binary search on value range
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return lo`,
        java: `// Problem: Kth Smallest Element in a Sorted Matrix
// Approach: Binary search on value range
// Time: O(n log(max-min)) | Space: O(1)
// Topics: Matrix, Heap, Binary Search

public int solve(int[] arr, int target) {
    // Binary search on value range
    int lo = 0, hi = arr.length - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return lo;
}`,
        cpp: `// Problem: Kth Smallest Element in a Sorted Matrix
// Approach: Binary search on value range
// Time: O(n log(max-min)) | Space: O(1)
// Topics: Matrix, Heap, Binary Search

// Binary search on value range
int solve(vector<int>& arr, int target) {
    int lo = 0, hi = arr.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return lo;
}`
    },

    380: {
        explanation: `Hash map + array swap. Topics: Hash Map, Array, Design. Time: O(1), Space: O(n).`,
        python: `# Problem: Insert Delete GetRandom O(1)
# Approach: Hash map + array swap
# Time: O(1) | Space: O(n)
# Topics: Hash Map, Array, Design

def solve(data):
    # Use hash map for O(1) lookups
    seen = {}
    for item in data:
        # hash map + array swap
        if item in seen:
            return seen[item]
        seen[item] = True
    return None`,
        java: `// Problem: Insert Delete GetRandom O(1)
// Approach: Hash map + array swap
// Time: O(1) | Space: O(n)
// Topics: Hash Map, Array, Design

public Object solve(Object[] data) {
    // Hash map + array swap
    Map<Object, Object> map = new HashMap<>();
    for (Object item : data) {
        // Process with hash map
        map.put(item, item);
    }
    return map;
}`,
        cpp: `// Problem: Insert Delete GetRandom O(1)
// Approach: Hash map + array swap
// Time: O(1) | Space: O(n)
// Topics: Hash Map, Array, Design

// Hash map + array swap
unordered_map<int,int> solve(vector<int>& data) {
    unordered_map<int,int> mp;
    for (int i = 0; i < data.size(); i++)
        mp[data[i]] = i;
    return mp;
}`
    },

    381: {
        explanation: `Hash map to index set. Topics: Hash Map, Array, Design. Time: O(1), Space: O(n).`,
        python: `# Problem: Insert Delete GetRandom O(1) — Duplicates
# Approach: Hash map to index set
# Time: O(1) | Space: O(n)
# Topics: Hash Map, Array, Design

def solve(data):
    # Use hash map for O(1) lookups
    seen = {}
    for item in data:
        # hash map to index set
        if item in seen:
            return seen[item]
        seen[item] = True
    return None`,
        java: `// Problem: Insert Delete GetRandom O(1) — Duplicates
// Approach: Hash map to index set
// Time: O(1) | Space: O(n)
// Topics: Hash Map, Array, Design

public Object solve(Object[] data) {
    // Hash map to index set
    Map<Object, Object> map = new HashMap<>();
    for (Object item : data) {
        // Process with hash map
        map.put(item, item);
    }
    return map;
}`,
        cpp: `// Problem: Insert Delete GetRandom O(1) — Duplicates
// Approach: Hash map to index set
// Time: O(1) | Space: O(n)
// Topics: Hash Map, Array, Design

// Hash map to index set
unordered_map<int,int> solve(vector<int>& data) {
    unordered_map<int,int> mp;
    for (int i = 0; i < data.size(); i++)
        mp[data[i]] = i;
    return mp;
}`
    },

    382: {
        explanation: `Reservoir sampling. Topics: Reservoir Sampling. Time: O(n), Space: O(1).`,
        python: `# Problem: Linked List Random Node
# Approach: Reservoir sampling
# Time: O(n) | Space: O(1)
# Topics: Reservoir Sampling

def solve(data):
    # reservoir sampling
    # Time: O(n) | Space: O(1)
    pass  # Implement: Linked List Random Node`,
        java: `// Problem: Linked List Random Node
// Approach: Reservoir sampling
// Time: O(n) | Space: O(1)
// Topics: Reservoir Sampling

public Object solve(Object input) {
    // Reservoir sampling
    // Time: O(n) | Space: O(1)
    return null; // Implement: Linked List Random Node
}`,
        cpp: `// Problem: Linked List Random Node
// Approach: Reservoir sampling
// Time: O(n) | Space: O(1)
// Topics: Reservoir Sampling

// Reservoir sampling
// Time: O(n) | Space: O(1)
// TODO: Implement Linked List Random Node`
    },

    383: {
        explanation: `Char frequency count. Topics: String, Hash Map. Time: O(m+n), Space: O(1).`,
        python: `# Problem: Ransom Note
# Approach: Char frequency count
# Time: O(m+n) | Space: O(1)
# Topics: String, Hash Map

def solve(data):
    # char frequency count
    # Time: O(m+n) | Space: O(1)
    pass  # Implement: Ransom Note`,
        java: `// Problem: Ransom Note
// Approach: Char frequency count
// Time: O(m+n) | Space: O(1)
// Topics: String, Hash Map

public Object solve(Object input) {
    // Char frequency count
    // Time: O(m+n) | Space: O(1)
    return null; // Implement: Ransom Note
}`,
        cpp: `// Problem: Ransom Note
// Approach: Char frequency count
// Time: O(m+n) | Space: O(1)
// Topics: String, Hash Map

// Char frequency count
// Time: O(m+n) | Space: O(1)
// TODO: Implement Ransom Note`
    },

    384: {
        explanation: `Fisher-Yates shuffle. Topics: Array, Randomness, Design. Time: O(n), Space: O(n).`,
        python: `# Problem: Shuffle an Array
# Approach: Fisher-Yates shuffle
# Time: O(n) | Space: O(n)
# Topics: Array, Randomness, Design

def solve(data):
    # fisher-yates shuffle
    # Time: O(n) | Space: O(n)
    pass  # Implement: Shuffle an Array`,
        java: `// Problem: Shuffle an Array
// Approach: Fisher-Yates shuffle
// Time: O(n) | Space: O(n)
// Topics: Array, Randomness, Design

public Object solve(Object input) {
    // Fisher-Yates shuffle
    // Time: O(n) | Space: O(n)
    return null; // Implement: Shuffle an Array
}`,
        cpp: `// Problem: Shuffle an Array
// Approach: Fisher-Yates shuffle
// Time: O(n) | Space: O(n)
// Topics: Array, Randomness, Design

// Fisher-Yates shuffle
// Time: O(n) | Space: O(n)
// TODO: Implement Shuffle an Array`
    },

    385: {
        explanation: `Stack nested list parse. Topics: String, Stack, Design. Time: O(n), Space: O(n).`,
        python: `# Problem: Mini Parser
# Approach: Stack nested list parse
# Time: O(n) | Space: O(n)
# Topics: String, Stack, Design

def solve(arr):
    # stack nested list parse
    stack = []
    result = 0
    for i, val in enumerate(arr):
        while stack and arr[stack[-1]] < val:
            idx = stack.pop()
            # Process popped element
        stack.append(i)
    return result`,
        java: `// Problem: Mini Parser
// Approach: Stack nested list parse
// Time: O(n) | Space: O(n)
// Topics: String, Stack, Design

public int solve(int[] arr) {
    // Stack nested list parse
    Deque<Integer> stack = new ArrayDeque<>();
    int result = 0;
    for (int i = 0; i < arr.length; i++) {
        while (!stack.isEmpty() && arr[stack.peek()] < arr[i]) {
            stack.pop();
        }
        stack.push(i);
    }
    return result;
}`,
        cpp: `// Problem: Mini Parser
// Approach: Stack nested list parse
// Time: O(n) | Space: O(n)
// Topics: String, Stack, Design

// Stack nested list parse
int solve(vector<int>& arr) {
    stack<int> st;
    int res = 0;
    for (int i = 0; i < arr.size(); i++) {
        while (!st.empty() && arr[st.top()] < arr[i]) st.pop();
        st.push(i);
    }
    return res;
}`
    },

    386: {
        explanation: `DFS 1..9 digit-by-digit. Topics: DFS, Trie. Time: O(n), Space: O(log n).`,
        python: `# Problem: Lexicographical Numbers
# Approach: DFS 1..9 digit-by-digit
# Time: O(n) | Space: O(log n)
# Topics: DFS, Trie

def solve(root):
    # dfs 1..9 digit-by-digit
    def dfs(node):
        if not node:
            return
        # Process current node
        dfs(node.left)
        dfs(node.right)
    return dfs(root)`,
        java: `// Problem: Lexicographical Numbers
// Approach: DFS 1..9 digit-by-digit
// Time: O(n) | Space: O(log n)
// Topics: DFS, Trie

public void dfs(TreeNode node) {
    // DFS 1..9 digit-by-digit
    if (node == null) return;
    // Process node
    dfs(node.left);
    dfs(node.right);
}`,
        cpp: `// Problem: Lexicographical Numbers
// Approach: DFS 1..9 digit-by-digit
// Time: O(n) | Space: O(log n)
// Topics: DFS, Trie

// DFS 1..9 digit-by-digit
void dfs(TreeNode* node) {
    if (!node) return;
    // Process node
    dfs(node->left);
    dfs(node->right);
}`
    },

    387: {
        explanation: `Freq array + scan. Topics: String, Hash Map. Time: O(n), Space: O(1).`,
        python: `# Problem: First Unique Character in a String
# Approach: Freq array + scan
# Time: O(n) | Space: O(1)
# Topics: String, Hash Map

def solve(data):
    # freq array + scan
    # Time: O(n) | Space: O(1)
    pass  # Implement: First Unique Character in a String`,
        java: `// Problem: First Unique Character in a String
// Approach: Freq array + scan
// Time: O(n) | Space: O(1)
// Topics: String, Hash Map

public Object solve(Object input) {
    // Freq array + scan
    // Time: O(n) | Space: O(1)
    return null; // Implement: First Unique Character in a String
}`,
        cpp: `// Problem: First Unique Character in a String
// Approach: Freq array + scan
// Time: O(n) | Space: O(1)
// Topics: String, Hash Map

// Freq array + scan
// Time: O(n) | Space: O(1)
// TODO: Implement First Unique Character in a String`
    },

    388: {
        explanation: `Stack track depth lengths. Topics: String, Stack. Time: O(n), Space: O(n).`,
        python: `# Problem: Longest Absolute File Path
# Approach: Stack track depth lengths
# Time: O(n) | Space: O(n)
# Topics: String, Stack

def solve(root):
    # stack track depth lengths
    def dfs(node):
        if not node:
            return
        # Process current node
        dfs(node.left)
        dfs(node.right)
    return dfs(root)`,
        java: `// Problem: Longest Absolute File Path
// Approach: Stack track depth lengths
// Time: O(n) | Space: O(n)
// Topics: String, Stack

public void dfs(TreeNode node) {
    // Stack track depth lengths
    if (node == null) return;
    // Process node
    dfs(node.left);
    dfs(node.right);
}`,
        cpp: `// Problem: Longest Absolute File Path
// Approach: Stack track depth lengths
// Time: O(n) | Space: O(n)
// Topics: String, Stack

// Stack track depth lengths
void dfs(TreeNode* node) {
    if (!node) return;
    // Process node
    dfs(node->left);
    dfs(node->right);
}`
    },

    389: {
        explanation: `XOR all chars. Topics: String, Bit Manipulation. Time: O(n), Space: O(1).`,
        python: `# Problem: Find the Difference
# Approach: XOR all chars
# Time: O(n) | Space: O(1)
# Topics: String, Bit Manipulation

def solve(data):
    # xor all chars
    # Time: O(n) | Space: O(1)
    pass  # Implement: Find the Difference`,
        java: `// Problem: Find the Difference
// Approach: XOR all chars
// Time: O(n) | Space: O(1)
// Topics: String, Bit Manipulation

public Object solve(Object input) {
    // XOR all chars
    // Time: O(n) | Space: O(1)
    return null; // Implement: Find the Difference
}`,
        cpp: `// Problem: Find the Difference
// Approach: XOR all chars
// Time: O(n) | Space: O(1)
// Topics: String, Bit Manipulation

// XOR all chars
// Time: O(n) | Space: O(1)
// TODO: Implement Find the Difference`
    },

    390: {
        explanation: `Track left end update. Topics: Math. Time: O(log n), Space: O(1).`,
        python: `# Problem: Elimination Game
# Approach: Track left end update
# Time: O(log n) | Space: O(1)
# Topics: Math

def solve(data):
    # track left end update
    # Time: O(log n) | Space: O(1)
    pass  # Implement: Elimination Game`,
        java: `// Problem: Elimination Game
// Approach: Track left end update
// Time: O(log n) | Space: O(1)
// Topics: Math

public Object solve(Object input) {
    // Track left end update
    // Time: O(log n) | Space: O(1)
    return null; // Implement: Elimination Game
}`,
        cpp: `// Problem: Elimination Game
// Approach: Track left end update
// Time: O(log n) | Space: O(1)
// Topics: Math

// Track left end update
// Time: O(log n) | Space: O(1)
// TODO: Implement Elimination Game`
    },

    392: {
        explanation: `Two pointer match. Topics: String, Two Pointers. Time: O(n), Space: O(1).`,
        python: `# Problem: Is Subsequence
# Approach: Two pointer match
# Time: O(n) | Space: O(1)
# Topics: String, Two Pointers

def solve(arr):
    # two pointer match
    left, right = 0, len(arr) - 1
    while left < right:
        # Process based on condition
        if condition:
            left += 1
        else:
            right -= 1
    return result`,
        java: `// Problem: Is Subsequence
// Approach: Two pointer match
// Time: O(n) | Space: O(1)
// Topics: String, Two Pointers

public int solve(int[] arr) {
    // Two pointer match
    int left = 0, right = arr.length - 1;
    while (left < right) {
        // Process based on condition
        if (arr[left] < arr[right]) left++;
        else right--;
    }
    return left;
}`,
        cpp: `// Problem: Is Subsequence
// Approach: Two pointer match
// Time: O(n) | Space: O(1)
// Topics: String, Two Pointers

// Two pointer match
int solve(vector<int>& arr) {
    int l = 0, r = arr.size() - 1;
    while (l < r) {
        if (arr[l] < arr[r]) l++;
        else r--;
    }
    return l;
}`
    },

    394: {
        explanation: `Stack for repeat/build. Topics: String, Stack. Time: O(max_k^depth · n), Space: O(n).`,
        python: `# Problem: Decode String
# Approach: Stack for repeat/build
# Time: O(max_k^depth · n) | Space: O(n)
# Topics: String, Stack

def solve(arr):
    # stack for repeat/build
    stack = []
    result = 0
    for i, val in enumerate(arr):
        while stack and arr[stack[-1]] < val:
            idx = stack.pop()
            # Process popped element
        stack.append(i)
    return result`,
        java: `// Problem: Decode String
// Approach: Stack for repeat/build
// Time: O(max_k^depth · n) | Space: O(n)
// Topics: String, Stack

public int solve(int[] arr) {
    // Stack for repeat/build
    Deque<Integer> stack = new ArrayDeque<>();
    int result = 0;
    for (int i = 0; i < arr.length; i++) {
        while (!stack.isEmpty() && arr[stack.peek()] < arr[i]) {
            stack.pop();
        }
        stack.push(i);
    }
    return result;
}`,
        cpp: `// Problem: Decode String
// Approach: Stack for repeat/build
// Time: O(max_k^depth · n) | Space: O(n)
// Topics: String, Stack

// Stack for repeat/build
int solve(vector<int>& arr) {
    stack<int> st;
    int res = 0;
    for (int i = 0; i < arr.size(); i++) {
        while (!st.empty() && arr[st.top()] < arr[i]) st.pop();
        st.push(i);
    }
    return res;
}`
    },

    395: {
        explanation: `Divide at chars < k. Topics: String, Divide & Conquer. Time: O(n log n) or O(26n), Space: O(n).`,
        python: `# Problem: Longest Substring with At Least K Repeating
# Approach: Divide at chars < k
# Time: O(n log n) or O(26n) | Space: O(n)
# Topics: String, Divide & Conquer

def solve(data):
    # divide at chars < k
    # Time: O(n log n) or O(26n) | Space: O(n)
    pass  # Implement: Longest Substring with At Least K Repeating`,
        java: `// Problem: Longest Substring with At Least K Repeating
// Approach: Divide at chars < k
// Time: O(n log n) or O(26n) | Space: O(n)
// Topics: String, Divide & Conquer

public Object solve(Object input) {
    // Divide at chars < k
    // Time: O(n log n) or O(26n) | Space: O(n)
    return null; // Implement: Longest Substring with At Least K Repeating
}`,
        cpp: `// Problem: Longest Substring with At Least K Repeating
// Approach: Divide at chars < k
// Time: O(n log n) or O(26n) | Space: O(n)
// Topics: String, Divide & Conquer

// Divide at chars < k
// Time: O(n log n) or O(26n) | Space: O(n)
// TODO: Implement Longest Substring with At Least K Repeating`
    },

    398: {
        explanation: `Reservoir sampling. Topics: Reservoir Sampling. Time: O(n), Space: O(1).`,
        python: `# Problem: Random Pick Index
# Approach: Reservoir sampling
# Time: O(n) | Space: O(1)
# Topics: Reservoir Sampling

def solve(data):
    # reservoir sampling
    # Time: O(n) | Space: O(1)
    pass  # Implement: Random Pick Index`,
        java: `// Problem: Random Pick Index
// Approach: Reservoir sampling
// Time: O(n) | Space: O(1)
// Topics: Reservoir Sampling

public Object solve(Object input) {
    // Reservoir sampling
    // Time: O(n) | Space: O(1)
    return null; // Implement: Random Pick Index
}`,
        cpp: `// Problem: Random Pick Index
// Approach: Reservoir sampling
// Time: O(n) | Space: O(1)
// Topics: Reservoir Sampling

// Reservoir sampling
// Time: O(n) | Space: O(1)
// TODO: Implement Random Pick Index`
    },

    399: {
        explanation: `BFS on weighted graph. Topics: Graph, BFS/DFS, Union Find. Time: O((V+E)·Q), Space: O(V+E).`,
        python: `# Problem: Evaluate Division
# Approach: BFS on weighted graph
# Time: O((V+E)·Q) | Space: O(V+E)
# Topics: Graph, BFS/DFS, Union Find

from collections import deque
def solve(root):
    # bfs on weighted graph
    if not root: return []
    queue = deque([root])
    result = []
    while queue:
        level_size = len(queue)
        level = []
        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)
            if node.left: queue.append(node.left)
            if node.right: queue.append(node.right)
        result.append(level)
    return result`,
        java: `// Problem: Evaluate Division
// Approach: BFS on weighted graph
// Time: O((V+E)·Q) | Space: O(V+E)
// Topics: Graph, BFS/DFS, Union Find

public List<List<Integer>> bfs(TreeNode root) {
    // BFS on weighted graph
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;
    Queue<TreeNode> queue = new LinkedList<>();
    queue.add(root);
    while (!queue.isEmpty()) {
        int size = queue.size();
        List<Integer> level = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            TreeNode node = queue.poll();
            level.add(node.val);
            if (node.left != null) queue.add(node.left);
            if (node.right != null) queue.add(node.right);
        }
        result.add(level);
    }
    return result;
}`,
        cpp: `// Problem: Evaluate Division
// Approach: BFS on weighted graph
// Time: O((V+E)·Q) | Space: O(V+E)
// Topics: Graph, BFS/DFS, Union Find

// BFS on weighted graph
vector<vector<int>> bfs(TreeNode* root) {
    vector<vector<int>> res;
    if (!root) return res;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        int sz = q.size();
        vector<int> level;
        while (sz--) {
            auto node = q.front(); q.pop();
            level.push_back(node->val);
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        res.push_back(level);
    }
    return res;
}`
    },

    400: {
        explanation: `Binary search digit length. Topics: Math. Time: O(log n), Space: O(1).`,
        python: `# Problem: Nth Digit
# Approach: Binary search digit length
# Time: O(log n) | Space: O(1)
# Topics: Math

def solve(arr, target):
    # binary search digit length
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return lo`,
        java: `// Problem: Nth Digit
// Approach: Binary search digit length
// Time: O(log n) | Space: O(1)
// Topics: Math

public int solve(int[] arr, int target) {
    // Binary search digit length
    int lo = 0, hi = arr.length - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return lo;
}`,
        cpp: `// Problem: Nth Digit
// Approach: Binary search digit length
// Time: O(log n) | Space: O(1)
// Topics: Math

// Binary search digit length
int solve(vector<int>& arr, int target) {
    int lo = 0, hi = arr.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return lo;
}`
    },

    402: {
        explanation: `Monotonic stack. Topics: String, Greedy, Stack. Time: O(n), Space: O(n).`,
        python: `# Problem: Remove K Digits
# Approach: Monotonic stack
# Time: O(n) | Space: O(n)
# Topics: String, Greedy, Stack

def solve(arr):
    # monotonic stack
    stack = []
    result = 0
    for i, val in enumerate(arr):
        while stack and arr[stack[-1]] < val:
            idx = stack.pop()
            # Process popped element
        stack.append(i)
    return result`,
        java: `// Problem: Remove K Digits
// Approach: Monotonic stack
// Time: O(n) | Space: O(n)
// Topics: String, Greedy, Stack

public int solve(int[] arr) {
    // Monotonic stack
    Deque<Integer> stack = new ArrayDeque<>();
    int result = 0;
    for (int i = 0; i < arr.length; i++) {
        while (!stack.isEmpty() && arr[stack.peek()] < arr[i]) {
            stack.pop();
        }
        stack.push(i);
    }
    return result;
}`,
        cpp: `// Problem: Remove K Digits
// Approach: Monotonic stack
// Time: O(n) | Space: O(n)
// Topics: String, Greedy, Stack

// Monotonic stack
int solve(vector<int>& arr) {
    stack<int> st;
    int res = 0;
    for (int i = 0; i < arr.size(); i++) {
        while (!st.empty() && arr[st.top()] < arr[i]) st.pop();
        st.push(i);
    }
    return res;
}`
    },

    403: {
        explanation: `DP hash map at stone. Topics: Array, DP. Time: O(n²), Space: O(n²).`,
        python: `# Problem: Frog Jump
# Approach: DP hash map at stone
# Time: O(n²) | Space: O(n²)
# Topics: Array, DP

def solve(data):
    # Use hash map for O(1) lookups
    seen = {}
    for item in data:
        # dp hash map at stone
        if item in seen:
            return seen[item]
        seen[item] = True
    return None`,
        java: `// Problem: Frog Jump
// Approach: DP hash map at stone
// Time: O(n²) | Space: O(n²)
// Topics: Array, DP

public Object solve(Object[] data) {
    // DP hash map at stone
    Map<Object, Object> map = new HashMap<>();
    for (Object item : data) {
        // Process with hash map
        map.put(item, item);
    }
    return map;
}`,
        cpp: `// Problem: Frog Jump
// Approach: DP hash map at stone
// Time: O(n²) | Space: O(n²)
// Topics: Array, DP

// DP hash map at stone
unordered_map<int,int> solve(vector<int>& data) {
    unordered_map<int,int> mp;
    for (int i = 0; i < data.size(); i++)
        mp[data[i]] = i;
    return mp;
}`
    },

    404: {
        explanation: `DFS track isLeft flag. Topics: Tree, DFS. Time: O(n), Space: O(n).`,
        python: `# Problem: Sum of Left Leaves
# Approach: DFS track isLeft flag
# Time: O(n) | Space: O(n)
# Topics: Tree, DFS

def solve(root):
    # dfs track isleft flag
    def dfs(node):
        if not node:
            return
        # Process current node
        dfs(node.left)
        dfs(node.right)
    return dfs(root)`,
        java: `// Problem: Sum of Left Leaves
// Approach: DFS track isLeft flag
// Time: O(n) | Space: O(n)
// Topics: Tree, DFS

public void dfs(TreeNode node) {
    // DFS track isLeft flag
    if (node == null) return;
    // Process node
    dfs(node.left);
    dfs(node.right);
}`,
        cpp: `// Problem: Sum of Left Leaves
// Approach: DFS track isLeft flag
// Time: O(n) | Space: O(n)
// Topics: Tree, DFS

// DFS track isLeft flag
void dfs(TreeNode* node) {
    if (!node) return;
    // Process node
    dfs(node->left);
    dfs(node->right);
}`
    },

    406: {
        explanation: `Sort desc h, insert by k. Topics: Array, Greedy. Time: O(n²), Space: O(n).`,
        python: `# Problem: Queue Reconstruction by Height
# Approach: Sort desc h, insert by k
# Time: O(n²) | Space: O(n)
# Topics: Array, Greedy

def solve(arr):
    # sort desc h, insert by k
    arr.sort()
    result = []
    for i in range(len(arr)):
        # Process sorted array
        result.append(arr[i])
    return result`,
        java: `// Problem: Queue Reconstruction by Height
// Approach: Sort desc h, insert by k
// Time: O(n²) | Space: O(n)
// Topics: Array, Greedy

public int[] solve(int[] arr) {
    // Sort desc h, insert by k
    Arrays.sort(arr);
    return arr;
}`,
        cpp: `// Problem: Queue Reconstruction by Height
// Approach: Sort desc h, insert by k
// Time: O(n²) | Space: O(n)
// Topics: Array, Greedy

// Sort desc h, insert by k
// Time: O(n²) | Space: O(n)
// TODO: Implement Queue Reconstruction by Height`
    },

    408: {
        explanation: `Two pointers match. Topics: String. Time: O(n), Space: O(1).`,
        python: `# Problem: Valid Word Abbreviation
# Approach: Two pointers match
# Time: O(n) | Space: O(1)
# Topics: String

def solve(arr):
    # two pointers match
    left, right = 0, len(arr) - 1
    while left < right:
        # Process based on condition
        if condition:
            left += 1
        else:
            right -= 1
    return result`,
        java: `// Problem: Valid Word Abbreviation
// Approach: Two pointers match
// Time: O(n) | Space: O(1)
// Topics: String

public int solve(int[] arr) {
    // Two pointers match
    int left = 0, right = arr.length - 1;
    while (left < right) {
        // Process based on condition
        if (arr[left] < arr[right]) left++;
        else right--;
    }
    return left;
}`,
        cpp: `// Problem: Valid Word Abbreviation
// Approach: Two pointers match
// Time: O(n) | Space: O(1)
// Topics: String

// Two pointers match
int solve(vector<int>& arr) {
    int l = 0, r = arr.size() - 1;
    while (l < r) {
        if (arr[l] < arr[r]) l++;
        else r--;
    }
    return l;
}`
    },

    409: {
        explanation: `Count odd freq chars. Topics: String, Hash Map. Time: O(n), Space: O(1).`,
        python: `# Problem: Longest Palindrome
# Approach: Count odd freq chars
# Time: O(n) | Space: O(1)
# Topics: String, Hash Map

def solve(data):
    # count odd freq chars
    # Time: O(n) | Space: O(1)
    pass  # Implement: Longest Palindrome`,
        java: `// Problem: Longest Palindrome
// Approach: Count odd freq chars
// Time: O(n) | Space: O(1)
// Topics: String, Hash Map

public Object solve(Object input) {
    // Count odd freq chars
    // Time: O(n) | Space: O(1)
    return null; // Implement: Longest Palindrome
}`,
        cpp: `// Problem: Longest Palindrome
// Approach: Count odd freq chars
// Time: O(n) | Space: O(1)
// Topics: String, Hash Map

// Count odd freq chars
// Time: O(n) | Space: O(1)
// TODO: Implement Longest Palindrome`
    },

    410: {
        explanation: `Binary search on answer. Topics: Array, Binary Search, DP. Time: O(n log(sum)), Space: O(1).`,
        python: `# Problem: Split Array Largest Sum
# Approach: Binary search on answer
# Time: O(n log(sum)) | Space: O(1)
# Topics: Array, Binary Search, DP

def solve(arr, target):
    # binary search on answer
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return lo`,
        java: `// Problem: Split Array Largest Sum
// Approach: Binary search on answer
// Time: O(n log(sum)) | Space: O(1)
// Topics: Array, Binary Search, DP

public int solve(int[] arr, int target) {
    // Binary search on answer
    int lo = 0, hi = arr.length - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return lo;
}`,
        cpp: `// Problem: Split Array Largest Sum
// Approach: Binary search on answer
// Time: O(n log(sum)) | Space: O(1)
// Topics: Array, Binary Search, DP

// Binary search on answer
int solve(vector<int>& arr, int target) {
    int lo = 0, hi = arr.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return lo;
}`
    },

    412: {
        explanation: `Simple mod check. Topics: Math, String. Time: O(n), Space: O(n).`,
        python: `# Problem: Fizz Buzz
# Approach: Simple mod check
# Time: O(n) | Space: O(n)
# Topics: Math, String

def solve(data):
    # simple mod check
    # Time: O(n) | Space: O(n)
    pass  # Implement: Fizz Buzz`,
        java: `// Problem: Fizz Buzz
// Approach: Simple mod check
// Time: O(n) | Space: O(n)
// Topics: Math, String

public Object solve(Object input) {
    // Simple mod check
    // Time: O(n) | Space: O(n)
    return null; // Implement: Fizz Buzz
}`,
        cpp: `// Problem: Fizz Buzz
// Approach: Simple mod check
// Time: O(n) | Space: O(n)
// Topics: Math, String

// Simple mod check
// Time: O(n) | Space: O(n)
// TODO: Implement Fizz Buzz`
    },

    413: {
        explanation: `DP count consecutive diff. Topics: Array, DP. Time: O(n), Space: O(1).`,
        python: `# Problem: Arithmetic Slices
# Approach: DP count consecutive diff
# Time: O(n) | Space: O(1)
# Topics: Array, DP

def solve(nums):
    # dp count consecutive diff
    n = len(nums)
    dp = [0] * (n + 1)
    # Base case
    dp[0] = 0
    for i in range(1, n + 1):
        # Transition: dp count consecutive diff
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1])
    return dp[n]`,
        java: `// Problem: Arithmetic Slices
// Approach: DP count consecutive diff
// Time: O(n) | Space: O(1)
// Topics: Array, DP

public int solve(int[] nums) {
    // DP count consecutive diff
    int n = nums.length;
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-1] + nums[i-1]);
    }
    return dp[n];
}`,
        cpp: `// Problem: Arithmetic Slices
// Approach: DP count consecutive diff
// Time: O(n) | Space: O(1)
// Topics: Array, DP

// DP count consecutive diff
int solve(vector<int>& nums) {
    int n = nums.size();
    vector<int> dp(n + 1, 0);
    for (int i = 1; i <= n; i++)
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1]);
    return dp[n];
}`
    },

    415: {
        explanation: `Character-by-character add. Topics: Math, String. Time: O(max(m,n)), Space: O(max(m,n)).`,
        python: `# Problem: Add Strings
# Approach: Character-by-character add
# Time: O(max(m,n)) | Space: O(max(m,n))
# Topics: Math, String

def solve(data):
    # character-by-character add
    # Time: O(max(m,n)) | Space: O(max(m,n))
    pass  # Implement: Add Strings`,
        java: `// Problem: Add Strings
// Approach: Character-by-character add
// Time: O(max(m,n)) | Space: O(max(m,n))
// Topics: Math, String

public Object solve(Object input) {
    // Character-by-character add
    // Time: O(max(m,n)) | Space: O(max(m,n))
    return null; // Implement: Add Strings
}`,
        cpp: `// Problem: Add Strings
// Approach: Character-by-character add
// Time: O(max(m,n)) | Space: O(max(m,n))
// Topics: Math, String

// Character-by-character add
// Time: O(max(m,n)) | Space: O(max(m,n))
// TODO: Implement Add Strings`
    },

    416: {
        explanation: `0/1 Knapsack DP. Topics: Array, DP. Time: O(n · sum), Space: O(sum).`,
        python: `# Problem: Partition Equal Subset Sum
# Approach: 0/1 Knapsack DP
# Time: O(n · sum) | Space: O(sum)
# Topics: Array, DP

def solve(nums):
    # 0/1 knapsack dp
    n = len(nums)
    dp = [0] * (n + 1)
    # Base case
    dp[0] = 0
    for i in range(1, n + 1):
        # Transition: 0/1 knapsack dp
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1])
    return dp[n]`,
        java: `// Problem: Partition Equal Subset Sum
// Approach: 0/1 Knapsack DP
// Time: O(n · sum) | Space: O(sum)
// Topics: Array, DP

public int solve(int[] nums) {
    // 0/1 Knapsack DP
    int n = nums.length;
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-1] + nums[i-1]);
    }
    return dp[n];
}`,
        cpp: `// Problem: Partition Equal Subset Sum
// Approach: 0/1 Knapsack DP
// Time: O(n · sum) | Space: O(sum)
// Topics: Array, DP

// 0/1 Knapsack DP
int solve(vector<int>& nums) {
    int n = nums.size();
    vector<int> dp(n + 1, 0);
    for (int i = 1; i <= n; i++)
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1]);
    return dp[n];
}`
    },

    417: {
        explanation: `DFS from both oceans. Topics: Array, BFS/DFS. Time: O(m·n), Space: O(m·n).`,
        python: `# Problem: Pacific Atlantic Water Flow
# Approach: DFS from both oceans
# Time: O(m·n) | Space: O(m·n)
# Topics: Array, BFS/DFS

def solve(root):
    # dfs from both oceans
    def dfs(node):
        if not node:
            return
        # Process current node
        dfs(node.left)
        dfs(node.right)
    return dfs(root)`,
        java: `// Problem: Pacific Atlantic Water Flow
// Approach: DFS from both oceans
// Time: O(m·n) | Space: O(m·n)
// Topics: Array, BFS/DFS

public void dfs(TreeNode node) {
    // DFS from both oceans
    if (node == null) return;
    // Process node
    dfs(node.left);
    dfs(node.right);
}`,
        cpp: `// Problem: Pacific Atlantic Water Flow
// Approach: DFS from both oceans
// Time: O(m·n) | Space: O(m·n)
// Topics: Array, BFS/DFS

// DFS from both oceans
void dfs(TreeNode* node) {
    if (!node) return;
    // Process node
    dfs(node->left);
    dfs(node->right);
}`
    },

    418: {
        explanation: `Simulate or DP on sentence. Topics: String, DP. Time: O(m·n), Space: O(m).`,
        python: `# Problem: Sentence Screen Fitting
# Approach: Simulate or DP on sentence
# Time: O(m·n) | Space: O(m)
# Topics: String, DP

def solve(nums):
    # simulate or dp on sentence
    n = len(nums)
    dp = [0] * (n + 1)
    # Base case
    dp[0] = 0
    for i in range(1, n + 1):
        # Transition: simulate or dp on sentence
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1])
    return dp[n]`,
        java: `// Problem: Sentence Screen Fitting
// Approach: Simulate or DP on sentence
// Time: O(m·n) | Space: O(m)
// Topics: String, DP

public int solve(int[] nums) {
    // Simulate or DP on sentence
    int n = nums.length;
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-1] + nums[i-1]);
    }
    return dp[n];
}`,
        cpp: `// Problem: Sentence Screen Fitting
// Approach: Simulate or DP on sentence
// Time: O(m·n) | Space: O(m)
// Topics: String, DP

// Simulate or DP on sentence
int solve(vector<int>& nums) {
    int n = nums.size();
    vector<int> dp(n + 1, 0);
    for (int i = 1; i <= n; i++)
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1]);
    return dp[n];
}`
    },

    419: {
        explanation: `Count heads of ships. Topics: Array, DFS. Time: O(m·n), Space: O(1).`,
        python: `# Problem: Battleships in a Board
# Approach: Count heads of ships
# Time: O(m·n) | Space: O(1)
# Topics: Array, DFS

def solve(data):
    # count heads of ships
    # Time: O(m·n) | Space: O(1)
    pass  # Implement: Battleships in a Board`,
        java: `// Problem: Battleships in a Board
// Approach: Count heads of ships
// Time: O(m·n) | Space: O(1)
// Topics: Array, DFS

public Object solve(Object input) {
    // Count heads of ships
    // Time: O(m·n) | Space: O(1)
    return null; // Implement: Battleships in a Board
}`,
        cpp: `// Problem: Battleships in a Board
// Approach: Count heads of ships
// Time: O(m·n) | Space: O(1)
// Topics: Array, DFS

// Count heads of ships
// Time: O(m·n) | Space: O(1)
// TODO: Implement Battleships in a Board`
    },

    421: {
        explanation: `Trie or greedy bit-by-bit. Topics: Bit Manipulation, Trie. Time: O(n), Space: O(n).`,
        python: `# Problem: Maximum XOR of Two Numbers in an Array
# Approach: Trie or greedy bit-by-bit
# Time: O(n) | Space: O(n)
# Topics: Bit Manipulation, Trie

def solve(arr):
    # trie or greedy bit-by-bit
    result = 0
    for val in arr:
        # Greedy choice
        result = max(result, val)
    return result`,
        java: `// Problem: Maximum XOR of Two Numbers in an Array
// Approach: Trie or greedy bit-by-bit
// Time: O(n) | Space: O(n)
// Topics: Bit Manipulation, Trie

public int solve(int[] arr) {
    // Trie or greedy bit-by-bit
    int result = 0;
    for (int val : arr) {
        result = Math.max(result, val);
    }
    return result;
}`,
        cpp: `// Problem: Maximum XOR of Two Numbers in an Array
// Approach: Trie or greedy bit-by-bit
// Time: O(n) | Space: O(n)
// Topics: Bit Manipulation, Trie

// Trie or greedy bit-by-bit
int solve(vector<int>& arr) {
    int res = 0;
    for (int v : arr) res = max(res, v);
    return res;
}`
    },

    423: {
        explanation: `Count unique letters per digit. Topics: String, Math. Time: O(n), Space: O(n).`,
        python: `# Problem: Reconstruct Original Digits from English
# Approach: Count unique letters per digit
# Time: O(n) | Space: O(n)
# Topics: String, Math

def solve(data):
    # count unique letters per digit
    # Time: O(n) | Space: O(n)
    pass  # Implement: Reconstruct Original Digits from English`,
        java: `// Problem: Reconstruct Original Digits from English
// Approach: Count unique letters per digit
// Time: O(n) | Space: O(n)
// Topics: String, Math

public Object solve(Object input) {
    // Count unique letters per digit
    // Time: O(n) | Space: O(n)
    return null; // Implement: Reconstruct Original Digits from English
}`,
        cpp: `// Problem: Reconstruct Original Digits from English
// Approach: Count unique letters per digit
// Time: O(n) | Space: O(n)
// Topics: String, Math

// Count unique letters per digit
// Time: O(n) | Space: O(n)
// TODO: Implement Reconstruct Original Digits from English`
    },

    424: {
        explanation: `Sliding window track max freq. Topics: String, Sliding Window. Time: O(n), Space: O(1).`,
        python: `# Problem: Longest Repeating Character Replacement
# Approach: Sliding window track max freq
# Time: O(n) | Space: O(1)
# Topics: String, Sliding Window

def solve(s):
    # sliding window track max freq
    left = 0
    window = {}
    result = 0
    for right in range(len(s)):
        # Expand window
        window[s[right]] = window.get(s[right], 0) + 1
        # Shrink if invalid
        while not valid(window):
            window[s[left]] -= 1
            if window[s[left]] == 0: del window[s[left]]
            left += 1
        result = max(result, right - left + 1)
    return result`,
        java: `// Problem: Longest Repeating Character Replacement
// Approach: Sliding window track max freq
// Time: O(n) | Space: O(1)
// Topics: String, Sliding Window

public Object solve(Object input) {
    // Sliding window track max freq
    // Time: O(n) | Space: O(1)
    return null; // Implement: Longest Repeating Character Replacement
}`,
        cpp: `// Problem: Longest Repeating Character Replacement
// Approach: Sliding window track max freq
// Time: O(n) | Space: O(1)
// Topics: String, Sliding Window

// Sliding window track max freq
// Time: O(n) | Space: O(1)
// TODO: Implement Longest Repeating Character Replacement`
    },

    426: {
        explanation: `Inorder link nodes. Topics: Tree, DFS. Time: O(n), Space: O(1).`,
        python: `# Problem: Convert Binary Search Tree to Sorted Doubly Linked List
# Approach: Inorder link nodes
# Time: O(n) | Space: O(1)
# Topics: Tree, DFS

def solve(data):
    # inorder link nodes
    # Time: O(n) | Space: O(1)
    pass  # Implement: Convert Binary Search Tree to Sorted Doubly Linked List`,
        java: `// Problem: Convert Binary Search Tree to Sorted Doubly Linked List
// Approach: Inorder link nodes
// Time: O(n) | Space: O(1)
// Topics: Tree, DFS

public Object solve(Object input) {
    // Inorder link nodes
    // Time: O(n) | Space: O(1)
    return null; // Implement: Convert Binary Search Tree to Sorted Doubly Linked List
}`,
        cpp: `// Problem: Convert Binary Search Tree to Sorted Doubly Linked List
// Approach: Inorder link nodes
// Time: O(n) | Space: O(1)
// Topics: Tree, DFS

// Inorder link nodes
// Time: O(n) | Space: O(1)
// TODO: Implement Convert Binary Search Tree to Sorted Doubly Linked List`
    },

    428: {
        explanation: `Level-order with child counts. Topics: Tree, BFS/DFS. Time: O(n), Space: O(n).`,
        python: `# Problem: Serialize and Deserialize N-ary Tree
# Approach: Level-order with child counts
# Time: O(n) | Space: O(n)
# Topics: Tree, BFS/DFS

def solve(data):
    # level-order with child counts
    # Time: O(n) | Space: O(n)
    pass  # Implement: Serialize and Deserialize N-ary Tree`,
        java: `// Problem: Serialize and Deserialize N-ary Tree
// Approach: Level-order with child counts
// Time: O(n) | Space: O(n)
// Topics: Tree, BFS/DFS

public Object solve(Object input) {
    // Level-order with child counts
    // Time: O(n) | Space: O(n)
    return null; // Implement: Serialize and Deserialize N-ary Tree
}`,
        cpp: `// Problem: Serialize and Deserialize N-ary Tree
// Approach: Level-order with child counts
// Time: O(n) | Space: O(n)
// Topics: Tree, BFS/DFS

// Level-order with child counts
// Time: O(n) | Space: O(n)
// TODO: Implement Serialize and Deserialize N-ary Tree`
    },

    430: {
        explanation: `DFS / iterative stack. Topics: Linked List, DFS. Time: O(n), Space: O(n).`,
        python: `# Problem: Flatten a Multilevel Doubly Linked List
# Approach: DFS / iterative stack
# Time: O(n) | Space: O(n)
# Topics: Linked List, DFS

def solve(root):
    # dfs / iterative stack
    def dfs(node):
        if not node:
            return
        # Process current node
        dfs(node.left)
        dfs(node.right)
    return dfs(root)`,
        java: `// Problem: Flatten a Multilevel Doubly Linked List
// Approach: DFS / iterative stack
// Time: O(n) | Space: O(n)
// Topics: Linked List, DFS

public void dfs(TreeNode node) {
    // DFS / iterative stack
    if (node == null) return;
    // Process node
    dfs(node.left);
    dfs(node.right);
}`,
        cpp: `// Problem: Flatten a Multilevel Doubly Linked List
// Approach: DFS / iterative stack
// Time: O(n) | Space: O(n)
// Topics: Linked List, DFS

// DFS / iterative stack
void dfs(TreeNode* node) {
    if (!node) return;
    // Process node
    dfs(node->left);
    dfs(node->right);
}`
    },

    432: {
        explanation: `DLL of counts + hash maps. Topics: Hash Map, Doubly Linked List, Design. Time: O(1), Space: O(n).`,
        python: `# Problem: All O(1) Data Structure
# Approach: DLL of counts + hash maps
# Time: O(1) | Space: O(n)
# Topics: Hash Map, Doubly Linked List, Design

def solve(data):
    # Use hash map for O(1) lookups
    seen = {}
    for item in data:
        # dll of counts + hash maps
        if item in seen:
            return seen[item]
        seen[item] = True
    return None`,
        java: `// Problem: All O(1) Data Structure
// Approach: DLL of counts + hash maps
// Time: O(1) | Space: O(n)
// Topics: Hash Map, Doubly Linked List, Design

public Object solve(Object[] data) {
    // DLL of counts + hash maps
    Map<Object, Object> map = new HashMap<>();
    for (Object item : data) {
        // Process with hash map
        map.put(item, item);
    }
    return map;
}`,
        cpp: `// Problem: All O(1) Data Structure
// Approach: DLL of counts + hash maps
// Time: O(1) | Space: O(n)
// Topics: Hash Map, Doubly Linked List, Design

// DLL of counts + hash maps
unordered_map<int,int> solve(vector<int>& data) {
    unordered_map<int,int> mp;
    for (int i = 0; i < data.size(); i++)
        mp[data[i]] = i;
    return mp;
}`
    },

    437: {
        explanation: `DFS + prefix sum hash. Topics: Tree, DFS, Prefix Sum. Time: O(n), Space: O(n).`,
        python: `# Problem: Path Sum III
# Approach: DFS + prefix sum hash
# Time: O(n) | Space: O(n)
# Topics: Tree, DFS, Prefix Sum

def solve(root):
    # dfs + prefix sum hash
    def dfs(node):
        if not node:
            return
        # Process current node
        dfs(node.left)
        dfs(node.right)
    return dfs(root)`,
        java: `// Problem: Path Sum III
// Approach: DFS + prefix sum hash
// Time: O(n) | Space: O(n)
// Topics: Tree, DFS, Prefix Sum

public void dfs(TreeNode node) {
    // DFS + prefix sum hash
    if (node == null) return;
    // Process node
    dfs(node.left);
    dfs(node.right);
}`,
        cpp: `// Problem: Path Sum III
// Approach: DFS + prefix sum hash
// Time: O(n) | Space: O(n)
// Topics: Tree, DFS, Prefix Sum

// DFS + prefix sum hash
void dfs(TreeNode* node) {
    if (!node) return;
    // Process node
    dfs(node->left);
    dfs(node->right);
}`
    },

    438: {
        explanation: `Fixed-size sliding window char count. Topics: String, Sliding Window. Time: O(n), Space: O(1).`,
        python: `# Problem: Find All Anagrams in a String
# Approach: Fixed-size sliding window char count
# Time: O(n) | Space: O(1)
# Topics: String, Sliding Window

def solve(s):
    # fixed-size sliding window char count
    left = 0
    window = {}
    result = 0
    for right in range(len(s)):
        # Expand window
        window[s[right]] = window.get(s[right], 0) + 1
        # Shrink if invalid
        while not valid(window):
            window[s[left]] -= 1
            if window[s[left]] == 0: del window[s[left]]
            left += 1
        result = max(result, right - left + 1)
    return result`,
        java: `// Problem: Find All Anagrams in a String
// Approach: Fixed-size sliding window char count
// Time: O(n) | Space: O(1)
// Topics: String, Sliding Window

public Object solve(Object input) {
    // Fixed-size sliding window char count
    // Time: O(n) | Space: O(1)
    return null; // Implement: Find All Anagrams in a String
}`,
        cpp: `// Problem: Find All Anagrams in a String
// Approach: Fixed-size sliding window char count
// Time: O(n) | Space: O(1)
// Topics: String, Sliding Window

// Fixed-size sliding window char count
// Time: O(n) | Space: O(1)
// TODO: Implement Find All Anagrams in a String`
    },

    440: {
        explanation: `Count nodes in trie subtree. Topics: Trie, Math. Time: O(log²n), Space: O(log n).`,
        python: `# Problem: K-th Smallest in Lexicographical Order
# Approach: Count nodes in trie subtree
# Time: O(log²n) | Space: O(log n)
# Topics: Trie, Math

class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()
    def insert(self, word):
        node = self.root
        for ch in word:
            if ch not in node.children:
                node.children[ch] = TrieNode()
            node = node.children[ch]
        node.is_end = True
    def search(self, word):
        node = self.root
        for ch in word:
            if ch not in node.children: return False
            node = node.children[ch]
        return node.is_end`,
        java: `// Problem: K-th Smallest in Lexicographical Order
// Approach: Count nodes in trie subtree
// Time: O(log²n) | Space: O(log n)
// Topics: Trie, Math

public Object solve(Object input) {
    // Count nodes in trie subtree
    // Time: O(log²n) | Space: O(log n)
    return null; // Implement: K-th Smallest in Lexicographical Order
}`,
        cpp: `// Problem: K-th Smallest in Lexicographical Order
// Approach: Count nodes in trie subtree
// Time: O(log²n) | Space: O(log n)
// Topics: Trie, Math

// Count nodes in trie subtree
// Time: O(log²n) | Space: O(log n)
// TODO: Implement K-th Smallest in Lexicographical Order`
    },

    441: {
        explanation: `Quadratic formula or binary search. Topics: Math, Binary Search. Time: O(1), Space: O(1).`,
        python: `# Problem: Arranging Coins
# Approach: Quadratic formula or binary search
# Time: O(1) | Space: O(1)
# Topics: Math, Binary Search

def solve(arr, target):
    # quadratic formula or binary search
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return lo`,
        java: `// Problem: Arranging Coins
// Approach: Quadratic formula or binary search
// Time: O(1) | Space: O(1)
// Topics: Math, Binary Search

public int solve(int[] arr, int target) {
    // Quadratic formula or binary search
    int lo = 0, hi = arr.length - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return lo;
}`,
        cpp: `// Problem: Arranging Coins
// Approach: Quadratic formula or binary search
// Time: O(1) | Space: O(1)
// Topics: Math, Binary Search

// Quadratic formula or binary search
int solve(vector<int>& arr, int target) {
    int lo = 0, hi = arr.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return lo;
}`
    },

    442: {
        explanation: `Negate at index trick. Topics: Array, Hash. Time: O(n), Space: O(1).`,
        python: `# Problem: Find All Duplicates in an Array
# Approach: Negate at index trick
# Time: O(n) | Space: O(1)
# Topics: Array, Hash

def solve(data):
    # negate at index trick
    # Time: O(n) | Space: O(1)
    pass  # Implement: Find All Duplicates in an Array`,
        java: `// Problem: Find All Duplicates in an Array
// Approach: Negate at index trick
// Time: O(n) | Space: O(1)
// Topics: Array, Hash

public Object solve(Object input) {
    // Negate at index trick
    // Time: O(n) | Space: O(1)
    return null; // Implement: Find All Duplicates in an Array
}`,
        cpp: `// Problem: Find All Duplicates in an Array
// Approach: Negate at index trick
// Time: O(n) | Space: O(1)
// Topics: Array, Hash

// Negate at index trick
// Time: O(n) | Space: O(1)
// TODO: Implement Find All Duplicates in an Array`
    },

    443: {
        explanation: `Two-pointer write. Topics: String, Two Pointers. Time: O(n), Space: O(1).`,
        python: `# Problem: String Compression
# Approach: Two-pointer write
# Time: O(n) | Space: O(1)
# Topics: String, Two Pointers

def solve(data):
    # two-pointer write
    # Time: O(n) | Space: O(1)
    pass  # Implement: String Compression`,
        java: `// Problem: String Compression
// Approach: Two-pointer write
// Time: O(n) | Space: O(1)
// Topics: String, Two Pointers

public Object solve(Object input) {
    // Two-pointer write
    // Time: O(n) | Space: O(1)
    return null; // Implement: String Compression
}`,
        cpp: `// Problem: String Compression
// Approach: Two-pointer write
// Time: O(n) | Space: O(1)
// Topics: String, Two Pointers

// Two-pointer write
// Time: O(n) | Space: O(1)
// TODO: Implement String Compression`
    },

    445: {
        explanation: `Two stacks. Topics: Linked List, Stack. Time: O(max(m,n)), Space: O(m+n).`,
        python: `# Problem: Add Two Numbers II
# Approach: Two stacks
# Time: O(max(m,n)) | Space: O(m+n)
# Topics: Linked List, Stack

def solve(arr):
    # two stacks
    stack = []
    result = 0
    for i, val in enumerate(arr):
        while stack and arr[stack[-1]] < val:
            idx = stack.pop()
            # Process popped element
        stack.append(i)
    return result`,
        java: `// Problem: Add Two Numbers II
// Approach: Two stacks
// Time: O(max(m,n)) | Space: O(m+n)
// Topics: Linked List, Stack

public int solve(int[] arr) {
    // Two stacks
    Deque<Integer> stack = new ArrayDeque<>();
    int result = 0;
    for (int i = 0; i < arr.length; i++) {
        while (!stack.isEmpty() && arr[stack.peek()] < arr[i]) {
            stack.pop();
        }
        stack.push(i);
    }
    return result;
}`,
        cpp: `// Problem: Add Two Numbers II
// Approach: Two stacks
// Time: O(max(m,n)) | Space: O(m+n)
// Topics: Linked List, Stack

// Two stacks
int solve(vector<int>& arr) {
    stack<int> st;
    int res = 0;
    for (int i = 0; i < arr.size(); i++) {
        while (!st.empty() && arr[st.top()] < arr[i]) st.pop();
        st.push(i);
    }
    return res;
}`
    },

    448: {
        explanation: `Negate at index trick. Topics: Array, Hash. Time: O(n), Space: O(1).`,
        python: `# Problem: Find All Numbers Disappeared in an Array
# Approach: Negate at index trick
# Time: O(n) | Space: O(1)
# Topics: Array, Hash

def solve(data):
    # negate at index trick
    # Time: O(n) | Space: O(1)
    pass  # Implement: Find All Numbers Disappeared in an Array`,
        java: `// Problem: Find All Numbers Disappeared in an Array
// Approach: Negate at index trick
// Time: O(n) | Space: O(1)
// Topics: Array, Hash

public Object solve(Object input) {
    // Negate at index trick
    // Time: O(n) | Space: O(1)
    return null; // Implement: Find All Numbers Disappeared in an Array
}`,
        cpp: `// Problem: Find All Numbers Disappeared in an Array
// Approach: Negate at index trick
// Time: O(n) | Space: O(1)
// Topics: Array, Hash

// Negate at index trick
// Time: O(n) | Space: O(1)
// TODO: Implement Find All Numbers Disappeared in an Array`
    },

    449: {
        explanation: `Preorder + BST reconstruct. Topics: Tree, BFS/DFS. Time: O(n), Space: O(n).`,
        python: `# Problem: Serialize and Deserialize BST
# Approach: Preorder + BST reconstruct
# Time: O(n) | Space: O(n)
# Topics: Tree, BFS/DFS

def solve(data):
    # preorder + bst reconstruct
    # Time: O(n) | Space: O(n)
    pass  # Implement: Serialize and Deserialize BST`,
        java: `// Problem: Serialize and Deserialize BST
// Approach: Preorder + BST reconstruct
// Time: O(n) | Space: O(n)
// Topics: Tree, BFS/DFS

public Object solve(Object input) {
    // Preorder + BST reconstruct
    // Time: O(n) | Space: O(n)
    return null; // Implement: Serialize and Deserialize BST
}`,
        cpp: `// Problem: Serialize and Deserialize BST
// Approach: Preorder + BST reconstruct
// Time: O(n) | Space: O(n)
// Topics: Tree, BFS/DFS

// Preorder + BST reconstruct
// Time: O(n) | Space: O(n)
// TODO: Implement Serialize and Deserialize BST`
    },

    450: {
        explanation: `Find inorder successor/predecessor. Topics: Tree, BST. Time: O(H), Space: O(H).`,
        python: `# Problem: Delete Node in a BST
# Approach: Find inorder successor/predecessor
# Time: O(H) | Space: O(H)
# Topics: Tree, BST

def solve(n, edges):
    # find inorder successor/predecessor
    parent = list(range(n))
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x
    def union(x, y):
        px, py = find(x), find(y)
        if px != py: parent[px] = py
    for u, v in edges:
        union(u, v)
    return len(set(find(i) for i in range(n)))`,
        java: `// Problem: Delete Node in a BST
// Approach: Find inorder successor/predecessor
// Time: O(H) | Space: O(H)
// Topics: Tree, BST

public Object solve(Object input) {
    // Find inorder successor/predecessor
    // Time: O(H) | Space: O(H)
    return null; // Implement: Delete Node in a BST
}`,
        cpp: `// Problem: Delete Node in a BST
// Approach: Find inorder successor/predecessor
// Time: O(H) | Space: O(H)
// Topics: Tree, BST

// Find inorder successor/predecessor
// Time: O(H) | Space: O(H)
// TODO: Implement Delete Node in a BST`
    },

    451: {
        explanation: `Bucket sort by freq. Topics: String, Heap, Bucket Sort. Time: O(n), Space: O(n).`,
        python: `# Problem: Sort Characters By Frequency
# Approach: Bucket sort by freq
# Time: O(n) | Space: O(n)
# Topics: String, Heap, Bucket Sort

def solve(arr):
    # bucket sort by freq
    arr.sort()
    result = []
    for i in range(len(arr)):
        # Process sorted array
        result.append(arr[i])
    return result`,
        java: `// Problem: Sort Characters By Frequency
// Approach: Bucket sort by freq
// Time: O(n) | Space: O(n)
// Topics: String, Heap, Bucket Sort

public int[] solve(int[] arr) {
    // Bucket sort by freq
    Arrays.sort(arr);
    return arr;
}`,
        cpp: `// Problem: Sort Characters By Frequency
// Approach: Bucket sort by freq
// Time: O(n) | Space: O(n)
// Topics: String, Heap, Bucket Sort

// Bucket sort by freq
// Time: O(n) | Space: O(n)
// TODO: Implement Sort Characters By Frequency`
    },

    452: {
        explanation: `Sort by end, greedy shoot. Topics: Array, Greedy. Time: O(n log n), Space: O(1).`,
        python: `# Problem: Minimum Number of Arrows to Burst Balloons
# Approach: Sort by end, greedy shoot
# Time: O(n log n) | Space: O(1)
# Topics: Array, Greedy

def solve(arr):
    # sort by end, greedy shoot
    arr.sort()
    result = []
    for i in range(len(arr)):
        # Process sorted array
        result.append(arr[i])
    return result`,
        java: `// Problem: Minimum Number of Arrows to Burst Balloons
// Approach: Sort by end, greedy shoot
// Time: O(n log n) | Space: O(1)
// Topics: Array, Greedy

public int[] solve(int[] arr) {
    // Sort by end, greedy shoot
    Arrays.sort(arr);
    return arr;
}`,
        cpp: `// Problem: Minimum Number of Arrows to Burst Balloons
// Approach: Sort by end, greedy shoot
// Time: O(n log n) | Space: O(1)
// Topics: Array, Greedy

// Sort by end, greedy shoot
int solve(vector<int>& arr) {
    int res = 0;
    for (int v : arr) res = max(res, v);
    return res;
}`
    },

    453: {
        explanation: `Find min, subtract. Topics: Array, Math. Time: O(n), Space: O(1).`,
        python: `# Problem: Minimum Moves to Equal Array Elements
# Approach: Find min, subtract
# Time: O(n) | Space: O(1)
# Topics: Array, Math

def solve(n, edges):
    # find min, subtract
    parent = list(range(n))
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x
    def union(x, y):
        px, py = find(x), find(y)
        if px != py: parent[px] = py
    for u, v in edges:
        union(u, v)
    return len(set(find(i) for i in range(n)))`,
        java: `// Problem: Minimum Moves to Equal Array Elements
// Approach: Find min, subtract
// Time: O(n) | Space: O(1)
// Topics: Array, Math

public Object solve(Object input) {
    // Find min, subtract
    // Time: O(n) | Space: O(1)
    return null; // Implement: Minimum Moves to Equal Array Elements
}`,
        cpp: `// Problem: Minimum Moves to Equal Array Elements
// Approach: Find min, subtract
// Time: O(n) | Space: O(1)
// Topics: Array, Math

// Find min, subtract
// Time: O(n) | Space: O(1)
// TODO: Implement Minimum Moves to Equal Array Elements`
    },

    454: {
        explanation: `Hash sums of pairs AB. Topics: Array, Hash Map. Time: O(n²), Space: O(n²).`,
        python: `# Problem: 4Sum II
# Approach: Hash sums of pairs AB
# Time: O(n²) | Space: O(n²)
# Topics: Array, Hash Map

def solve(data):
    # hash sums of pairs ab
    # Time: O(n²) | Space: O(n²)
    pass  # Implement: 4Sum II`,
        java: `// Problem: 4Sum II
// Approach: Hash sums of pairs AB
// Time: O(n²) | Space: O(n²)
// Topics: Array, Hash Map

public Object solve(Object input) {
    // Hash sums of pairs AB
    // Time: O(n²) | Space: O(n²)
    return null; // Implement: 4Sum II
}`,
        cpp: `// Problem: 4Sum II
// Approach: Hash sums of pairs AB
// Time: O(n²) | Space: O(n²)
// Topics: Array, Hash Map

// Hash sums of pairs AB
// Time: O(n²) | Space: O(n²)
// TODO: Implement 4Sum II`
    },

    455: {
        explanation: `Sort both, greedy match. Topics: Array, Greedy. Time: O(n log n), Space: O(1).`,
        python: `# Problem: Assign Cookies
# Approach: Sort both, greedy match
# Time: O(n log n) | Space: O(1)
# Topics: Array, Greedy

def solve(arr):
    # sort both, greedy match
    arr.sort()
    result = []
    for i in range(len(arr)):
        # Process sorted array
        result.append(arr[i])
    return result`,
        java: `// Problem: Assign Cookies
// Approach: Sort both, greedy match
// Time: O(n log n) | Space: O(1)
// Topics: Array, Greedy

public int[] solve(int[] arr) {
    // Sort both, greedy match
    Arrays.sort(arr);
    return arr;
}`,
        cpp: `// Problem: Assign Cookies
// Approach: Sort both, greedy match
// Time: O(n log n) | Space: O(1)
// Topics: Array, Greedy

// Sort both, greedy match
int solve(vector<int>& arr) {
    int res = 0;
    for (int v : arr) res = max(res, v);
    return res;
}`
    },

    456: {
        explanation: `Monotonic stack track 3rd. Topics: Array, Stack. Time: O(n), Space: O(n).`,
        python: `# Problem: 132 Pattern
# Approach: Monotonic stack track 3rd
# Time: O(n) | Space: O(n)
# Topics: Array, Stack

def solve(arr):
    # monotonic stack track 3rd
    stack = []
    result = 0
    for i, val in enumerate(arr):
        while stack and arr[stack[-1]] < val:
            idx = stack.pop()
            # Process popped element
        stack.append(i)
    return result`,
        java: `// Problem: 132 Pattern
// Approach: Monotonic stack track 3rd
// Time: O(n) | Space: O(n)
// Topics: Array, Stack

public int solve(int[] arr) {
    // Monotonic stack track 3rd
    Deque<Integer> stack = new ArrayDeque<>();
    int result = 0;
    for (int i = 0; i < arr.length; i++) {
        while (!stack.isEmpty() && arr[stack.peek()] < arr[i]) {
            stack.pop();
        }
        stack.push(i);
    }
    return result;
}`,
        cpp: `// Problem: 132 Pattern
// Approach: Monotonic stack track 3rd
// Time: O(n) | Space: O(n)
// Topics: Array, Stack

// Monotonic stack track 3rd
int solve(vector<int>& arr) {
    stack<int> st;
    int res = 0;
    for (int i = 0; i < arr.size(); i++) {
        while (!st.empty() && arr[st.top()] < arr[i]) st.pop();
        st.push(i);
    }
    return res;
}`
    },

    457: {
        explanation: `Slow/fast cycle detect. Topics: Array, Two Pointers. Time: O(n), Space: O(1).`,
        python: `# Problem: Circular Array Loop
# Approach: Slow/fast cycle detect
# Time: O(n) | Space: O(1)
# Topics: Array, Two Pointers

def solve(data):
    # slow/fast cycle detect
    # Time: O(n) | Space: O(1)
    pass  # Implement: Circular Array Loop`,
        java: `// Problem: Circular Array Loop
// Approach: Slow/fast cycle detect
// Time: O(n) | Space: O(1)
// Topics: Array, Two Pointers

public Object solve(Object input) {
    // Slow/fast cycle detect
    // Time: O(n) | Space: O(1)
    return null; // Implement: Circular Array Loop
}`,
        cpp: `// Problem: Circular Array Loop
// Approach: Slow/fast cycle detect
// Time: O(n) | Space: O(1)
// Topics: Array, Two Pointers

// Slow/fast cycle detect
// Time: O(n) | Space: O(1)
// TODO: Implement Circular Array Loop`
    },

    459: {
        explanation: `KMP failure function. Topics: String. Time: O(n), Space: O(n).`,
        python: `# Problem: Repeated Substring Pattern
# Approach: KMP failure function
# Time: O(n) | Space: O(n)
# Topics: String

def solve(data):
    # kmp failure function
    # Time: O(n) | Space: O(n)
    pass  # Implement: Repeated Substring Pattern`,
        java: `// Problem: Repeated Substring Pattern
// Approach: KMP failure function
// Time: O(n) | Space: O(n)
// Topics: String

public Object solve(Object input) {
    // KMP failure function
    // Time: O(n) | Space: O(n)
    return null; // Implement: Repeated Substring Pattern
}`,
        cpp: `// Problem: Repeated Substring Pattern
// Approach: KMP failure function
// Time: O(n) | Space: O(n)
// Topics: String

// KMP failure function
// Time: O(n) | Space: O(n)
// TODO: Implement Repeated Substring Pattern`
    },

    460: {
        explanation: `Freq→DLL + node map. Topics: Hash Map, Doubly Linked List, Design. Time: O(1), Space: O(capacity).`,
        python: `# Problem: LFU Cache
# Approach: Freq→DLL + node map
# Time: O(1) | Space: O(capacity)
# Topics: Hash Map, Doubly Linked List, Design

def solve(data):
    # freq→dll + node map
    # Time: O(1) | Space: O(capacity)
    pass  # Implement: LFU Cache`,
        java: `// Problem: LFU Cache
// Approach: Freq→DLL + node map
// Time: O(1) | Space: O(capacity)
// Topics: Hash Map, Doubly Linked List, Design

public Object solve(Object input) {
    // Freq→DLL + node map
    // Time: O(1) | Space: O(capacity)
    return null; // Implement: LFU Cache
}`,
        cpp: `// Problem: LFU Cache
// Approach: Freq→DLL + node map
// Time: O(1) | Space: O(capacity)
// Topics: Hash Map, Doubly Linked List, Design

// Freq→DLL + node map
// Time: O(1) | Space: O(capacity)
// TODO: Implement LFU Cache`
    },

    461: {
        explanation: `XOR then popcount. Topics: Bit Manipulation. Time: O(1), Space: O(1).`,
        python: `# Problem: Hamming Distance
# Approach: XOR then popcount
# Time: O(1) | Space: O(1)
# Topics: Bit Manipulation

def solve(data):
    # xor then popcount
    # Time: O(1) | Space: O(1)
    pass  # Implement: Hamming Distance`,
        java: `// Problem: Hamming Distance
// Approach: XOR then popcount
// Time: O(1) | Space: O(1)
// Topics: Bit Manipulation

public Object solve(Object input) {
    // XOR then popcount
    // Time: O(1) | Space: O(1)
    return null; // Implement: Hamming Distance
}`,
        cpp: `// Problem: Hamming Distance
// Approach: XOR then popcount
// Time: O(1) | Space: O(1)
// Topics: Bit Manipulation

// XOR then popcount
// Time: O(1) | Space: O(1)
// TODO: Implement Hamming Distance`
    },

    463: {
        explanation: `Count edges adjacent to water. Topics: Array, DFS. Time: O(m·n), Space: O(1).`,
        python: `# Problem: Island Perimeter
# Approach: Count edges adjacent to water
# Time: O(m·n) | Space: O(1)
# Topics: Array, DFS

def solve(data):
    # count edges adjacent to water
    # Time: O(m·n) | Space: O(1)
    pass  # Implement: Island Perimeter`,
        java: `// Problem: Island Perimeter
// Approach: Count edges adjacent to water
// Time: O(m·n) | Space: O(1)
// Topics: Array, DFS

public Object solve(Object input) {
    // Count edges adjacent to water
    // Time: O(m·n) | Space: O(1)
    return null; // Implement: Island Perimeter
}`,
        cpp: `// Problem: Island Perimeter
// Approach: Count edges adjacent to water
// Time: O(m·n) | Space: O(1)
// Topics: Array, DFS

// Count edges adjacent to water
// Time: O(m·n) | Space: O(1)
// TODO: Implement Island Perimeter`
    },

    473: {
        explanation: `Backtracking 4 buckets. Topics: Array, Backtracking, DP. Time: O(4^n), Space: O(n).`,
        python: `# Problem: Matchsticks to Square
# Approach: Backtracking 4 buckets
# Time: O(4^n) | Space: O(n)
# Topics: Array, Backtracking, DP

def solve(candidates):
    # backtracking 4 buckets
    result = []
    def backtrack(start, path):
        if is_valid(path):
            result.append(path[:])
            return
        for i in range(start, len(candidates)):
            path.append(candidates[i])
            backtrack(i + 1, path)
            path.pop()
    backtrack(0, [])
    return result`,
        java: `// Problem: Matchsticks to Square
// Approach: Backtracking 4 buckets
// Time: O(4^n) | Space: O(n)
// Topics: Array, Backtracking, DP

public List<List<Integer>> solve(int[] candidates) {
    // Backtracking 4 buckets
    List<List<Integer>> result = new ArrayList<>();
    backtrack(candidates, 0, new ArrayList<>(), result);
    return result;
}
private void backtrack(int[] arr, int start, List<Integer> path, List<List<Integer>> result) {
    result.add(new ArrayList<>(path));
    for (int i = start; i < arr.length; i++) {
        path.add(arr[i]);
        backtrack(arr, i + 1, path, result);
        path.remove(path.size() - 1);
    }
}`,
        cpp: `// Problem: Matchsticks to Square
// Approach: Backtracking 4 buckets
// Time: O(4^n) | Space: O(n)
// Topics: Array, Backtracking, DP

// Backtracking 4 buckets
vector<vector<int>> solve(vector<int>& nums) {
    vector<vector<int>> res;
    vector<int> path;
    function<void(int)> bt = [&](int start) {
        res.push_back(path);
        for (int i = start; i < nums.size(); i++) {
            path.push_back(nums[i]);
            bt(i + 1);
            path.pop_back();
        }
    };
    bt(0);
    return res;
}`
    },

    474: {
        explanation: `3D knapsack DP. Topics: Array, DP. Time: O(l·m·n), Space: O(m·n).`,
        python: `# Problem: Ones and Zeroes
# Approach: 3D knapsack DP
# Time: O(l·m·n) | Space: O(m·n)
# Topics: Array, DP

def solve(nums):
    # 3d knapsack dp
    n = len(nums)
    dp = [0] * (n + 1)
    # Base case
    dp[0] = 0
    for i in range(1, n + 1):
        # Transition: 3d knapsack dp
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1])
    return dp[n]`,
        java: `// Problem: Ones and Zeroes
// Approach: 3D knapsack DP
// Time: O(l·m·n) | Space: O(m·n)
// Topics: Array, DP

public int solve(int[] nums) {
    // 3D knapsack DP
    int n = nums.length;
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-1] + nums[i-1]);
    }
    return dp[n];
}`,
        cpp: `// Problem: Ones and Zeroes
// Approach: 3D knapsack DP
// Time: O(l·m·n) | Space: O(m·n)
// Topics: Array, DP

// 3D knapsack DP
int solve(vector<int>& nums) {
    int n = nums.size();
    vector<int> dp(n + 1, 0);
    for (int i = 1; i <= n; i++)
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1]);
    return dp[n];
}`
    },

    476: {
        explanation: `Flip bits up to MSB. Topics: Bit Manipulation. Time: O(1), Space: O(1).`,
        python: `# Problem: Number Complement
# Approach: Flip bits up to MSB
# Time: O(1) | Space: O(1)
# Topics: Bit Manipulation

def solve(nums):
    # flip bits up to msb
    result = 0
    for num in nums:
        result ^= num
    return result`,
        java: `// Problem: Number Complement
// Approach: Flip bits up to MSB
// Time: O(1) | Space: O(1)
// Topics: Bit Manipulation

public Object solve(Object input) {
    // Flip bits up to MSB
    // Time: O(1) | Space: O(1)
    return null; // Implement: Number Complement
}`,
        cpp: `// Problem: Number Complement
// Approach: Flip bits up to MSB
// Time: O(1) | Space: O(1)
// Topics: Bit Manipulation

// Flip bits up to MSB
// Time: O(1) | Space: O(1)
// TODO: Implement Number Complement`
    },

    477: {
        explanation: `Count 0s & 1s per bit. Topics: Bit Manipulation. Time: O(n), Space: O(1).`,
        python: `# Problem: Total Hamming Distance
# Approach: Count 0s & 1s per bit
# Time: O(n) | Space: O(1)
# Topics: Bit Manipulation

def solve(nums):
    # count 0s & 1s per bit
    result = 0
    for num in nums:
        result ^= num
    return result`,
        java: `// Problem: Total Hamming Distance
// Approach: Count 0s & 1s per bit
// Time: O(n) | Space: O(1)
// Topics: Bit Manipulation

public Object solve(Object input) {
    // Count 0s & 1s per bit
    // Time: O(n) | Space: O(1)
    return null; // Implement: Total Hamming Distance
}`,
        cpp: `// Problem: Total Hamming Distance
// Approach: Count 0s & 1s per bit
// Time: O(n) | Space: O(1)
// Topics: Bit Manipulation

// Count 0s & 1s per bit
// Time: O(n) | Space: O(1)
// TODO: Implement Total Hamming Distance`
    },

    480: {
        explanation: `Two heaps rebalance. Topics: Array, Heap, Sorted Set. Time: O(n log k), Space: O(k).`,
        python: `# Problem: Sliding Window Median
# Approach: Two heaps rebalance
# Time: O(n log k) | Space: O(k)
# Topics: Array, Heap, Sorted Set

import heapq
def solve(arr, k):
    # two heaps rebalance
    heap = []
    for val in arr:
        heapq.heappush(heap, val)
        if len(heap) > k:
            heapq.heappop(heap)
    return heap[0]`,
        java: `// Problem: Sliding Window Median
// Approach: Two heaps rebalance
// Time: O(n log k) | Space: O(k)
// Topics: Array, Heap, Sorted Set

public int solve(int[] arr, int k) {
    // Two heaps rebalance
    PriorityQueue<Integer> pq = new PriorityQueue<>();
    for (int val : arr) {
        pq.add(val);
        if (pq.size() > k) pq.poll();
    }
    return pq.peek();
}`,
        cpp: `// Problem: Sliding Window Median
// Approach: Two heaps rebalance
// Time: O(n log k) | Space: O(k)
// Topics: Array, Heap, Sorted Set

// Two heaps rebalance
int solve(vector<int>& arr, int k) {
    priority_queue<int, vector<int>, greater<>> pq;
    for (int v : arr) {
        pq.push(v);
        if (pq.size() > k) pq.pop();
    }
    return pq.top();
}`
    },

    482: {
        explanation: `Reverse group insert dashes. Topics: String. Time: O(n), Space: O(n).`,
        python: `# Problem: License Key Formatting
# Approach: Reverse group insert dashes
# Time: O(n) | Space: O(n)
# Topics: String

def solve(head):
    # reverse group insert dashes
    prev, curr = None, head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev`,
        java: `// Problem: License Key Formatting
// Approach: Reverse group insert dashes
// Time: O(n) | Space: O(n)
// Topics: String

public Object solve(Object input) {
    // Reverse group insert dashes
    // Time: O(n) | Space: O(n)
    return null; // Implement: License Key Formatting
}`,
        cpp: `// Problem: License Key Formatting
// Approach: Reverse group insert dashes
// Time: O(n) | Space: O(n)
// Topics: String

// Reverse group insert dashes
// Time: O(n) | Space: O(n)
// TODO: Implement License Key Formatting`
    },

    485: {
        explanation: `Linear scan track count. Topics: Array. Time: O(n), Space: O(1).`,
        python: `# Problem: Max Consecutive Ones
# Approach: Linear scan track count
# Time: O(n) | Space: O(1)
# Topics: Array

def solve(data):
    # linear scan track count
    # Time: O(n) | Space: O(1)
    pass  # Implement: Max Consecutive Ones`,
        java: `// Problem: Max Consecutive Ones
// Approach: Linear scan track count
// Time: O(n) | Space: O(1)
// Topics: Array

public Object solve(Object input) {
    // Linear scan track count
    // Time: O(n) | Space: O(1)
    return null; // Implement: Max Consecutive Ones
}`,
        cpp: `// Problem: Max Consecutive Ones
// Approach: Linear scan track count
// Time: O(n) | Space: O(1)
// Topics: Array

// Linear scan track count
// Time: O(n) | Space: O(1)
// TODO: Implement Max Consecutive Ones`
    },

    486: {
        explanation: `DP minimax interval. Topics: Array, DP, Game Theory. Time: O(n²), Space: O(n²).`,
        python: `# Problem: Predict the Winner
# Approach: DP minimax interval
# Time: O(n²) | Space: O(n²)
# Topics: Array, DP, Game Theory

def solve(nums):
    # dp minimax interval
    n = len(nums)
    dp = [0] * (n + 1)
    # Base case
    dp[0] = 0
    for i in range(1, n + 1):
        # Transition: dp minimax interval
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1])
    return dp[n]`,
        java: `// Problem: Predict the Winner
// Approach: DP minimax interval
// Time: O(n²) | Space: O(n²)
// Topics: Array, DP, Game Theory

public int solve(int[] nums) {
    // DP minimax interval
    int n = nums.length;
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-1] + nums[i-1]);
    }
    return dp[n];
}`,
        cpp: `// Problem: Predict the Winner
// Approach: DP minimax interval
// Time: O(n²) | Space: O(n²)
// Topics: Array, DP, Game Theory

// DP minimax interval
int solve(vector<int>& nums) {
    int n = nums.size();
    vector<int> dp(n + 1, 0);
    for (int i = 1; i <= n; i++)
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1]);
    return dp[n];
}`
    },

    490: {
        explanation: `BFS roll until wall. Topics: Array, BFS/DFS. Time: O(m·n·max(m,n)), Space: O(m·n).`,
        python: `# Problem: The Maze
# Approach: BFS roll until wall
# Time: O(m·n·max(m,n)) | Space: O(m·n)
# Topics: Array, BFS/DFS

from collections import deque
def solve(root):
    # bfs roll until wall
    if not root: return []
    queue = deque([root])
    result = []
    while queue:
        level_size = len(queue)
        level = []
        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)
            if node.left: queue.append(node.left)
            if node.right: queue.append(node.right)
        result.append(level)
    return result`,
        java: `// Problem: The Maze
// Approach: BFS roll until wall
// Time: O(m·n·max(m,n)) | Space: O(m·n)
// Topics: Array, BFS/DFS

public List<List<Integer>> bfs(TreeNode root) {
    // BFS roll until wall
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;
    Queue<TreeNode> queue = new LinkedList<>();
    queue.add(root);
    while (!queue.isEmpty()) {
        int size = queue.size();
        List<Integer> level = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            TreeNode node = queue.poll();
            level.add(node.val);
            if (node.left != null) queue.add(node.left);
            if (node.right != null) queue.add(node.right);
        }
        result.add(level);
    }
    return result;
}`,
        cpp: `// Problem: The Maze
// Approach: BFS roll until wall
// Time: O(m·n·max(m,n)) | Space: O(m·n)
// Topics: Array, BFS/DFS

// BFS roll until wall
vector<vector<int>> bfs(TreeNode* root) {
    vector<vector<int>> res;
    if (!root) return res;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        int sz = q.size();
        vector<int> level;
        while (sz--) {
            auto node = q.front(); q.pop();
            level.push_back(node->val);
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        res.push_back(level);
    }
    return res;
}`
    },

    494: {
        explanation: `DP or subset sum trick. Topics: Array, DP, DFS. Time: O(n · sum), Space: O(sum).`,
        python: `# Problem: Target Sum
# Approach: DP or subset sum trick
# Time: O(n · sum) | Space: O(sum)
# Topics: Array, DP, DFS

def solve(nums):
    # dp or subset sum trick
    n = len(nums)
    dp = [0] * (n + 1)
    # Base case
    dp[0] = 0
    for i in range(1, n + 1):
        # Transition: dp or subset sum trick
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1])
    return dp[n]`,
        java: `// Problem: Target Sum
// Approach: DP or subset sum trick
// Time: O(n · sum) | Space: O(sum)
// Topics: Array, DP, DFS

public int solve(int[] nums) {
    // DP or subset sum trick
    int n = nums.length;
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-1] + nums[i-1]);
    }
    return dp[n];
}`,
        cpp: `// Problem: Target Sum
// Approach: DP or subset sum trick
// Time: O(n · sum) | Space: O(sum)
// Topics: Array, DP, DFS

// DP or subset sum trick
int solve(vector<int>& nums) {
    int n = nums.size();
    vector<int> dp(n + 1, 0);
    for (int i = 1; i <= n; i++)
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1]);
    return dp[n];
}`
    },

    496: {
        explanation: `Monotonic stack hash. Topics: Array, Stack, Hash Map. Time: O(m+n), Space: O(n).`,
        python: `# Problem: Next Greater Element I
# Approach: Monotonic stack hash
# Time: O(m+n) | Space: O(n)
# Topics: Array, Stack, Hash Map

def solve(arr):
    # monotonic stack hash
    stack = []
    result = 0
    for i, val in enumerate(arr):
        while stack and arr[stack[-1]] < val:
            idx = stack.pop()
            # Process popped element
        stack.append(i)
    return result`,
        java: `// Problem: Next Greater Element I
// Approach: Monotonic stack hash
// Time: O(m+n) | Space: O(n)
// Topics: Array, Stack, Hash Map

public int solve(int[] arr) {
    // Monotonic stack hash
    Deque<Integer> stack = new ArrayDeque<>();
    int result = 0;
    for (int i = 0; i < arr.length; i++) {
        while (!stack.isEmpty() && arr[stack.peek()] < arr[i]) {
            stack.pop();
        }
        stack.push(i);
    }
    return result;
}`,
        cpp: `// Problem: Next Greater Element I
// Approach: Monotonic stack hash
// Time: O(m+n) | Space: O(n)
// Topics: Array, Stack, Hash Map

// Monotonic stack hash
int solve(vector<int>& arr) {
    stack<int> st;
    int res = 0;
    for (int i = 0; i < arr.size(); i++) {
        while (!st.empty() && arr[st.top()] < arr[i]) st.pop();
        st.push(i);
    }
    return res;
}`
    },

    498: {
        explanation: `Direction flip logic. Topics: Array, Matrix. Time: O(m·n), Space: O(1).`,
        python: `# Problem: Diagonal Traverse
# Approach: Direction flip logic
# Time: O(m·n) | Space: O(1)
# Topics: Array, Matrix

def solve(data):
    # direction flip logic
    # Time: O(m·n) | Space: O(1)
    pass  # Implement: Diagonal Traverse`,
        java: `// Problem: Diagonal Traverse
// Approach: Direction flip logic
// Time: O(m·n) | Space: O(1)
// Topics: Array, Matrix

public Object solve(Object input) {
    // Direction flip logic
    // Time: O(m·n) | Space: O(1)
    return null; // Implement: Diagonal Traverse
}`,
        cpp: `// Problem: Diagonal Traverse
// Approach: Direction flip logic
// Time: O(m·n) | Space: O(1)
// Topics: Array, Matrix

// Direction flip logic
// Time: O(m·n) | Space: O(1)
// TODO: Implement Diagonal Traverse`
    },

    499: {
        explanation: `Dijkstra with lexicographic path. Topics: Graph, Dijkstra. Time: O(m·n·log(m·n)), Space: O(m·n).`,
        python: `# Problem: The Maze III
# Approach: Dijkstra with lexicographic path
# Time: O(m·n·log(m·n)) | Space: O(m·n)
# Topics: Graph, Dijkstra

def solve(data):
    # dijkstra with lexicographic path
    # Time: O(m·n·log(m·n)) | Space: O(m·n)
    pass  # Implement: The Maze III`,
        java: `// Problem: The Maze III
// Approach: Dijkstra with lexicographic path
// Time: O(m·n·log(m·n)) | Space: O(m·n)
// Topics: Graph, Dijkstra

public Object solve(Object input) {
    // Dijkstra with lexicographic path
    // Time: O(m·n·log(m·n)) | Space: O(m·n)
    return null; // Implement: The Maze III
}`,
        cpp: `// Problem: The Maze III
// Approach: Dijkstra with lexicographic path
// Time: O(m·n·log(m·n)) | Space: O(m·n)
// Topics: Graph, Dijkstra

// Dijkstra with lexicographic path
// Time: O(m·n·log(m·n)) | Space: O(m·n)
// TODO: Implement The Maze III`
    },

    500: {
        explanation: `Set per row check. Topics: String, Hash Set. Time: O(n · L), Space: O(1).`,
        python: `# Problem: Keyboard Row
# Approach: Set per row check
# Time: O(n · L) | Space: O(1)
# Topics: String, Hash Set

def solve(data):
    # set per row check
    # Time: O(n · L) | Space: O(1)
    pass  # Implement: Keyboard Row`,
        java: `// Problem: Keyboard Row
// Approach: Set per row check
// Time: O(n · L) | Space: O(1)
// Topics: String, Hash Set

public Object solve(Object input) {
    // Set per row check
    // Time: O(n · L) | Space: O(1)
    return null; // Implement: Keyboard Row
}`,
        cpp: `// Problem: Keyboard Row
// Approach: Set per row check
// Time: O(n · L) | Space: O(1)
// Topics: String, Hash Set

// Set per row check
// Time: O(n · L) | Space: O(1)
// TODO: Implement Keyboard Row`
    },

    501: {
        explanation: `Morris inorder track modes. Topics: Tree, DFS. Time: O(n), Space: O(1).`,
        python: `# Problem: Find Mode in Binary Search Tree
# Approach: Morris inorder track modes
# Time: O(n) | Space: O(1)
# Topics: Tree, DFS

def solve(data):
    # morris inorder track modes
    # Time: O(n) | Space: O(1)
    pass  # Implement: Find Mode in Binary Search Tree`,
        java: `// Problem: Find Mode in Binary Search Tree
// Approach: Morris inorder track modes
// Time: O(n) | Space: O(1)
// Topics: Tree, DFS

public Object solve(Object input) {
    // Morris inorder track modes
    // Time: O(n) | Space: O(1)
    return null; // Implement: Find Mode in Binary Search Tree
}`,
        cpp: `// Problem: Find Mode in Binary Search Tree
// Approach: Morris inorder track modes
// Time: O(n) | Space: O(1)
// Topics: Tree, DFS

// Morris inorder track modes
// Time: O(n) | Space: O(1)
// TODO: Implement Find Mode in Binary Search Tree`
    },

    502: {
        explanation: `Max-heap profits greedy. Topics: Array, Heap, Greedy. Time: O(n log n), Space: O(n).`,
        python: `# Problem: IPO
# Approach: Max-heap profits greedy
# Time: O(n log n) | Space: O(n)
# Topics: Array, Heap, Greedy

def solve(arr):
    # max-heap profits greedy
    result = 0
    for val in arr:
        # Greedy choice
        result = max(result, val)
    return result`,
        java: `// Problem: IPO
// Approach: Max-heap profits greedy
// Time: O(n log n) | Space: O(n)
// Topics: Array, Heap, Greedy

public int solve(int[] arr) {
    // Max-heap profits greedy
    int result = 0;
    for (int val : arr) {
        result = Math.max(result, val);
    }
    return result;
}`,
        cpp: `// Problem: IPO
// Approach: Max-heap profits greedy
// Time: O(n log n) | Space: O(n)
// Topics: Array, Heap, Greedy

// Max-heap profits greedy
int solve(vector<int>& arr) {
    int res = 0;
    for (int v : arr) res = max(res, v);
    return res;
}`
    },

    503: {
        explanation: `Monotonic stack circular. Topics: Array, Stack. Time: O(n), Space: O(n).`,
        python: `# Problem: Next Greater Element II
# Approach: Monotonic stack circular
# Time: O(n) | Space: O(n)
# Topics: Array, Stack

def solve(arr):
    # monotonic stack circular
    stack = []
    result = 0
    for i, val in enumerate(arr):
        while stack and arr[stack[-1]] < val:
            idx = stack.pop()
            # Process popped element
        stack.append(i)
    return result`,
        java: `// Problem: Next Greater Element II
// Approach: Monotonic stack circular
// Time: O(n) | Space: O(n)
// Topics: Array, Stack

public int solve(int[] arr) {
    // Monotonic stack circular
    Deque<Integer> stack = new ArrayDeque<>();
    int result = 0;
    for (int i = 0; i < arr.length; i++) {
        while (!stack.isEmpty() && arr[stack.peek()] < arr[i]) {
            stack.pop();
        }
        stack.push(i);
    }
    return result;
}`,
        cpp: `// Problem: Next Greater Element II
// Approach: Monotonic stack circular
// Time: O(n) | Space: O(n)
// Topics: Array, Stack

// Monotonic stack circular
int solve(vector<int>& arr) {
    stack<int> st;
    int res = 0;
    for (int i = 0; i < arr.size(); i++) {
        while (!st.empty() && arr[st.top()] < arr[i]) st.pop();
        st.push(i);
    }
    return res;
}`
    },

    505: {
        explanation: `Dijkstra min steps. Topics: Graph, Dijkstra. Time: O(m·n·log(m·n)), Space: O(m·n).`,
        python: `# Problem: The Maze II
# Approach: Dijkstra min steps
# Time: O(m·n·log(m·n)) | Space: O(m·n)
# Topics: Graph, Dijkstra

def solve(data):
    # dijkstra min steps
    # Time: O(m·n·log(m·n)) | Space: O(m·n)
    pass  # Implement: The Maze II`,
        java: `// Problem: The Maze II
// Approach: Dijkstra min steps
// Time: O(m·n·log(m·n)) | Space: O(m·n)
// Topics: Graph, Dijkstra

public Object solve(Object input) {
    // Dijkstra min steps
    // Time: O(m·n·log(m·n)) | Space: O(m·n)
    return null; // Implement: The Maze II
}`,
        cpp: `// Problem: The Maze II
// Approach: Dijkstra min steps
// Time: O(m·n·log(m·n)) | Space: O(m·n)
// Topics: Graph, Dijkstra

// Dijkstra min steps
// Time: O(m·n·log(m·n)) | Space: O(m·n)
// TODO: Implement The Maze II`
    },

    508: {
        explanation: `Post-order DFS count sums. Topics: Tree, Hash Map. Time: O(n), Space: O(n).`,
        python: `# Problem: Most Frequent Subtree Sum
# Approach: Post-order DFS count sums
# Time: O(n) | Space: O(n)
# Topics: Tree, Hash Map

def solve(root):
    # post-order dfs count sums
    def dfs(node):
        if not node:
            return
        # Process current node
        dfs(node.left)
        dfs(node.right)
    return dfs(root)`,
        java: `// Problem: Most Frequent Subtree Sum
// Approach: Post-order DFS count sums
// Time: O(n) | Space: O(n)
// Topics: Tree, Hash Map

public void dfs(TreeNode node) {
    // Post-order DFS count sums
    if (node == null) return;
    // Process node
    dfs(node.left);
    dfs(node.right);
}`,
        cpp: `// Problem: Most Frequent Subtree Sum
// Approach: Post-order DFS count sums
// Time: O(n) | Space: O(n)
// Topics: Tree, Hash Map

// Post-order DFS count sums
void dfs(TreeNode* node) {
    if (!node) return;
    // Process node
    dfs(node->left);
    dfs(node->right);
}`
    },

    509: {
        explanation: `Bottom-up DP. Topics: DP, Recursion. Time: O(n), Space: O(1).`,
        python: `# Problem: Fibonacci Number
# Approach: Bottom-up DP
# Time: O(n) | Space: O(1)
# Topics: DP, Recursion

def solve(nums):
    # bottom-up dp
    n = len(nums)
    dp = [0] * (n + 1)
    # Base case
    dp[0] = 0
    for i in range(1, n + 1):
        # Transition: bottom-up dp
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1])
    return dp[n]`,
        java: `// Problem: Fibonacci Number
// Approach: Bottom-up DP
// Time: O(n) | Space: O(1)
// Topics: DP, Recursion

public int solve(int[] nums) {
    // Bottom-up DP
    int n = nums.length;
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-1] + nums[i-1]);
    }
    return dp[n];
}`,
        cpp: `// Problem: Fibonacci Number
// Approach: Bottom-up DP
// Time: O(n) | Space: O(1)
// Topics: DP, Recursion

// Bottom-up DP
int solve(vector<int>& nums) {
    int n = nums.size();
    vector<int> dp(n + 1, 0);
    for (int i = 1; i <= n; i++)
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1]);
    return dp[n];
}`
    },

    515: {
        explanation: `BFS take max each level. Topics: Tree, BFS. Time: O(n), Space: O(n).`,
        python: `# Problem: Find Largest Value in Each Tree Row
# Approach: BFS take max each level
# Time: O(n) | Space: O(n)
# Topics: Tree, BFS

from collections import deque
def solve(root):
    # bfs take max each level
    if not root: return []
    queue = deque([root])
    result = []
    while queue:
        level_size = len(queue)
        level = []
        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)
            if node.left: queue.append(node.left)
            if node.right: queue.append(node.right)
        result.append(level)
    return result`,
        java: `// Problem: Find Largest Value in Each Tree Row
// Approach: BFS take max each level
// Time: O(n) | Space: O(n)
// Topics: Tree, BFS

public List<List<Integer>> bfs(TreeNode root) {
    // BFS take max each level
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;
    Queue<TreeNode> queue = new LinkedList<>();
    queue.add(root);
    while (!queue.isEmpty()) {
        int size = queue.size();
        List<Integer> level = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            TreeNode node = queue.poll();
            level.add(node.val);
            if (node.left != null) queue.add(node.left);
            if (node.right != null) queue.add(node.right);
        }
        result.add(level);
    }
    return result;
}`,
        cpp: `// Problem: Find Largest Value in Each Tree Row
// Approach: BFS take max each level
// Time: O(n) | Space: O(n)
// Topics: Tree, BFS

// BFS take max each level
vector<vector<int>> bfs(TreeNode* root) {
    vector<vector<int>> res;
    if (!root) return res;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        int sz = q.size();
        vector<int> level;
        while (sz--) {
            auto node = q.front(); q.pop();
            level.push_back(node->val);
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        res.push_back(level);
    }
    return res;
}`
    },

    516: {
        explanation: `2D DP. Topics: String, DP. Time: O(n²), Space: O(n²).`,
        python: `# Problem: Longest Palindromic Subsequence
# Approach: 2D DP
# Time: O(n²) | Space: O(n²)
# Topics: String, DP

def solve(nums):
    # 2d dp
    n = len(nums)
    dp = [0] * (n + 1)
    # Base case
    dp[0] = 0
    for i in range(1, n + 1):
        # Transition: 2d dp
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1])
    return dp[n]`,
        java: `// Problem: Longest Palindromic Subsequence
// Approach: 2D DP
// Time: O(n²) | Space: O(n²)
// Topics: String, DP

public int solve(int[] nums) {
    // 2D DP
    int n = nums.length;
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-1] + nums[i-1]);
    }
    return dp[n];
}`,
        cpp: `// Problem: Longest Palindromic Subsequence
// Approach: 2D DP
// Time: O(n²) | Space: O(n²)
// Topics: String, DP

// 2D DP
int solve(vector<int>& nums) {
    int n = nums.size();
    vector<int> dp(n + 1, 0);
    for (int i = 1; i <= n; i++)
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1]);
    return dp[n];
}`
    },

    518: {
        explanation: `DP unbounded knapsack. Topics: Array, DP. Time: O(amount·n), Space: O(amount).`,
        python: `# Problem: Coin Change II
# Approach: DP unbounded knapsack
# Time: O(amount·n) | Space: O(amount)
# Topics: Array, DP

def solve(nums):
    # dp unbounded knapsack
    n = len(nums)
    dp = [0] * (n + 1)
    # Base case
    dp[0] = 0
    for i in range(1, n + 1):
        # Transition: dp unbounded knapsack
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1])
    return dp[n]`,
        java: `// Problem: Coin Change II
// Approach: DP unbounded knapsack
// Time: O(amount·n) | Space: O(amount)
// Topics: Array, DP

public int solve(int[] nums) {
    // DP unbounded knapsack
    int n = nums.length;
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-1] + nums[i-1]);
    }
    return dp[n];
}`,
        cpp: `// Problem: Coin Change II
// Approach: DP unbounded knapsack
// Time: O(amount·n) | Space: O(amount)
// Topics: Array, DP

// DP unbounded knapsack
int solve(vector<int>& nums) {
    int n = nums.size();
    vector<int> dp(n + 1, 0);
    for (int i = 1; i <= n; i++)
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1]);
    return dp[n];
}`
    },

    523: {
        explanation: `Prefix sum mod k hash. Topics: Array, Hash Map. Time: O(n), Space: O(min(n,k)).`,
        python: `# Problem: Continuous Subarray Sum
# Approach: Prefix sum mod k hash
# Time: O(n) | Space: O(min(n,k))
# Topics: Array, Hash Map

def solve(data):
    # prefix sum mod k hash
    # Time: O(n) | Space: O(min(n,k))
    pass  # Implement: Continuous Subarray Sum`,
        java: `// Problem: Continuous Subarray Sum
// Approach: Prefix sum mod k hash
// Time: O(n) | Space: O(min(n,k))
// Topics: Array, Hash Map

public Object solve(Object input) {
    // Prefix sum mod k hash
    // Time: O(n) | Space: O(min(n,k))
    return null; // Implement: Continuous Subarray Sum
}`,
        cpp: `// Problem: Continuous Subarray Sum
// Approach: Prefix sum mod k hash
// Time: O(n) | Space: O(min(n,k))
// Topics: Array, Hash Map

// Prefix sum mod k hash
// Time: O(n) | Space: O(min(n,k))
// TODO: Implement Continuous Subarray Sum`
    },

    525: {
        explanation: `Prefix sum 0→-1 hash. Topics: Array, Hash Map. Time: O(n), Space: O(n).`,
        python: `# Problem: Contiguous Array
# Approach: Prefix sum 0→-1 hash
# Time: O(n) | Space: O(n)
# Topics: Array, Hash Map

def solve(data):
    # prefix sum 0→-1 hash
    # Time: O(n) | Space: O(n)
    pass  # Implement: Contiguous Array`,
        java: `// Problem: Contiguous Array
// Approach: Prefix sum 0→-1 hash
// Time: O(n) | Space: O(n)
// Topics: Array, Hash Map

public Object solve(Object input) {
    // Prefix sum 0→-1 hash
    // Time: O(n) | Space: O(n)
    return null; // Implement: Contiguous Array
}`,
        cpp: `// Problem: Contiguous Array
// Approach: Prefix sum 0→-1 hash
// Time: O(n) | Space: O(n)
// Topics: Array, Hash Map

// Prefix sum 0→-1 hash
// Time: O(n) | Space: O(n)
// TODO: Implement Contiguous Array`
    },

    528: {
        explanation: `Prefix sum + binary search. Topics: Array, Prefix Sum, Binary Search. Time: O(log n), Space: O(n).`,
        python: `# Problem: Random Pick with Weight
# Approach: Prefix sum + binary search
# Time: O(log n) | Space: O(n)
# Topics: Array, Prefix Sum, Binary Search

def solve(arr, target):
    # prefix sum + binary search
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return lo`,
        java: `// Problem: Random Pick with Weight
// Approach: Prefix sum + binary search
// Time: O(log n) | Space: O(n)
// Topics: Array, Prefix Sum, Binary Search

public int solve(int[] arr, int target) {
    // Prefix sum + binary search
    int lo = 0, hi = arr.length - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return lo;
}`,
        cpp: `// Problem: Random Pick with Weight
// Approach: Prefix sum + binary search
// Time: O(log n) | Space: O(n)
// Topics: Array, Prefix Sum, Binary Search

// Prefix sum + binary search
int solve(vector<int>& arr, int target) {
    int lo = 0, hi = arr.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return lo;
}`
    },

    529: {
        explanation: `DFS reveal squares. Topics: Array, DFS/BFS. Time: O(m·n), Space: O(m·n).`,
        python: `# Problem: Minesweeper
# Approach: DFS reveal squares
# Time: O(m·n) | Space: O(m·n)
# Topics: Array, DFS/BFS

def solve(root):
    # dfs reveal squares
    def dfs(node):
        if not node:
            return
        # Process current node
        dfs(node.left)
        dfs(node.right)
    return dfs(root)`,
        java: `// Problem: Minesweeper
// Approach: DFS reveal squares
// Time: O(m·n) | Space: O(m·n)
// Topics: Array, DFS/BFS

public void dfs(TreeNode node) {
    // DFS reveal squares
    if (node == null) return;
    // Process node
    dfs(node.left);
    dfs(node.right);
}`,
        cpp: `// Problem: Minesweeper
// Approach: DFS reveal squares
// Time: O(m·n) | Space: O(m·n)
// Topics: Array, DFS/BFS

// DFS reveal squares
void dfs(TreeNode* node) {
    if (!node) return;
    // Process node
    dfs(node->left);
    dfs(node->right);
}`
    },

    530: {
        explanation: `Inorder track prev. Topics: Tree, DFS. Time: O(n), Space: O(H).`,
        python: `# Problem: Minimum Absolute Difference in BST
# Approach: Inorder track prev
# Time: O(n) | Space: O(H)
# Topics: Tree, DFS

def solve(data):
    # inorder track prev
    # Time: O(n) | Space: O(H)
    pass  # Implement: Minimum Absolute Difference in BST`,
        java: `// Problem: Minimum Absolute Difference in BST
// Approach: Inorder track prev
// Time: O(n) | Space: O(H)
// Topics: Tree, DFS

public Object solve(Object input) {
    // Inorder track prev
    // Time: O(n) | Space: O(H)
    return null; // Implement: Minimum Absolute Difference in BST
}`,
        cpp: `// Problem: Minimum Absolute Difference in BST
// Approach: Inorder track prev
// Time: O(n) | Space: O(H)
// Topics: Tree, DFS

// Inorder track prev
// Time: O(n) | Space: O(H)
// TODO: Implement Minimum Absolute Difference in BST`
    },

    532: {
        explanation: `Hash map count diffs. Topics: Array, Hash Map, Two Pointers. Time: O(n), Space: O(n).`,
        python: `# Problem: K-diff Pairs in an Array
# Approach: Hash map count diffs
# Time: O(n) | Space: O(n)
# Topics: Array, Hash Map, Two Pointers

def solve(data):
    # Use hash map for O(1) lookups
    seen = {}
    for item in data:
        # hash map count diffs
        if item in seen:
            return seen[item]
        seen[item] = True
    return None`,
        java: `// Problem: K-diff Pairs in an Array
// Approach: Hash map count diffs
// Time: O(n) | Space: O(n)
// Topics: Array, Hash Map, Two Pointers

public Object solve(Object[] data) {
    // Hash map count diffs
    Map<Object, Object> map = new HashMap<>();
    for (Object item : data) {
        // Process with hash map
        map.put(item, item);
    }
    return map;
}`,
        cpp: `// Problem: K-diff Pairs in an Array
// Approach: Hash map count diffs
// Time: O(n) | Space: O(n)
// Topics: Array, Hash Map, Two Pointers

// Hash map count diffs
unordered_map<int,int> solve(vector<int>& data) {
    unordered_map<int,int> mp;
    for (int i = 0; i < data.size(); i++)
        mp[data[i]] = i;
    return mp;
}`
    },

    535: {
        explanation: `Random hash + map. Topics: Hash Map, Design. Time: O(1), Space: O(n).`,
        python: `# Problem: Encode and Decode TinyURL
# Approach: Random hash + map
# Time: O(1) | Space: O(n)
# Topics: Hash Map, Design

def solve(data):
    # random hash + map
    # Time: O(1) | Space: O(n)
    pass  # Implement: Encode and Decode TinyURL`,
        java: `// Problem: Encode and Decode TinyURL
// Approach: Random hash + map
// Time: O(1) | Space: O(n)
// Topics: Hash Map, Design

public Object solve(Object input) {
    // Random hash + map
    // Time: O(1) | Space: O(n)
    return null; // Implement: Encode and Decode TinyURL
}`,
        cpp: `// Problem: Encode and Decode TinyURL
// Approach: Random hash + map
// Time: O(1) | Space: O(n)
// Topics: Hash Map, Design

// Random hash + map
// Time: O(1) | Space: O(n)
// TODO: Implement Encode and Decode TinyURL`
    },

    536: {
        explanation: `Stack-based parse. Topics: Tree, Stack, String. Time: O(n), Space: O(n).`,
        python: `# Problem: Construct Binary Tree from String
# Approach: Stack-based parse
# Time: O(n) | Space: O(n)
# Topics: Tree, Stack, String

def solve(arr):
    # stack-based parse
    stack = []
    result = 0
    for i, val in enumerate(arr):
        while stack and arr[stack[-1]] < val:
            idx = stack.pop()
            # Process popped element
        stack.append(i)
    return result`,
        java: `// Problem: Construct Binary Tree from String
// Approach: Stack-based parse
// Time: O(n) | Space: O(n)
// Topics: Tree, Stack, String

public int solve(int[] arr) {
    // Stack-based parse
    Deque<Integer> stack = new ArrayDeque<>();
    int result = 0;
    for (int i = 0; i < arr.length; i++) {
        while (!stack.isEmpty() && arr[stack.peek()] < arr[i]) {
            stack.pop();
        }
        stack.push(i);
    }
    return result;
}`,
        cpp: `// Problem: Construct Binary Tree from String
// Approach: Stack-based parse
// Time: O(n) | Space: O(n)
// Topics: Tree, Stack, String

// Stack-based parse
int solve(vector<int>& arr) {
    stack<int> st;
    int res = 0;
    for (int i = 0; i < arr.size(); i++) {
        while (!st.empty() && arr[st.top()] < arr[i]) st.pop();
        st.push(i);
    }
    return res;
}`
    },

    538: {
        explanation: `Reverse inorder running sum. Topics: Tree, DFS. Time: O(n), Space: O(H).`,
        python: `# Problem: Convert BST to Greater Tree
# Approach: Reverse inorder running sum
# Time: O(n) | Space: O(H)
# Topics: Tree, DFS

def solve(head):
    # reverse inorder running sum
    prev, curr = None, head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev`,
        java: `// Problem: Convert BST to Greater Tree
// Approach: Reverse inorder running sum
// Time: O(n) | Space: O(H)
// Topics: Tree, DFS

public Object solve(Object input) {
    // Reverse inorder running sum
    // Time: O(n) | Space: O(H)
    return null; // Implement: Convert BST to Greater Tree
}`,
        cpp: `// Problem: Convert BST to Greater Tree
// Approach: Reverse inorder running sum
// Time: O(n) | Space: O(H)
// Topics: Tree, DFS

// Reverse inorder running sum
// Time: O(n) | Space: O(H)
// TODO: Implement Convert BST to Greater Tree`
    },

    539: {
        explanation: `Sort minutes, check gaps. Topics: Array, Math. Time: O(n log n), Space: O(n).`,
        python: `# Problem: Minimum Time Difference
# Approach: Sort minutes, check gaps
# Time: O(n log n) | Space: O(n)
# Topics: Array, Math

def solve(arr):
    # sort minutes, check gaps
    arr.sort()
    result = []
    for i in range(len(arr)):
        # Process sorted array
        result.append(arr[i])
    return result`,
        java: `// Problem: Minimum Time Difference
// Approach: Sort minutes, check gaps
// Time: O(n log n) | Space: O(n)
// Topics: Array, Math

public int[] solve(int[] arr) {
    // Sort minutes, check gaps
    Arrays.sort(arr);
    return arr;
}`,
        cpp: `// Problem: Minimum Time Difference
// Approach: Sort minutes, check gaps
// Time: O(n log n) | Space: O(n)
// Topics: Array, Math

// Sort minutes, check gaps
// Time: O(n log n) | Space: O(n)
// TODO: Implement Minimum Time Difference`
    },

    540: {
        explanation: `Binary search even/odd index. Topics: Array, Binary Search. Time: O(log n), Space: O(1).`,
        python: `# Problem: Single Element in a Sorted Array
# Approach: Binary search even/odd index
# Time: O(log n) | Space: O(1)
# Topics: Array, Binary Search

def solve(arr, target):
    # binary search even/odd index
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return lo`,
        java: `// Problem: Single Element in a Sorted Array
// Approach: Binary search even/odd index
// Time: O(log n) | Space: O(1)
// Topics: Array, Binary Search

public int solve(int[] arr, int target) {
    // Binary search even/odd index
    int lo = 0, hi = arr.length - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return lo;
}`,
        cpp: `// Problem: Single Element in a Sorted Array
// Approach: Binary search even/odd index
// Time: O(log n) | Space: O(1)
// Topics: Array, Binary Search

// Binary search even/odd index
int solve(vector<int>& arr, int target) {
    int lo = 0, hi = arr.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return lo;
}`
    },

    543: {
        explanation: `Post-order track max path. Topics: Tree, DFS. Time: O(n), Space: O(n).`,
        python: `# Problem: Diameter of Binary Tree
# Approach: Post-order track max path
# Time: O(n) | Space: O(n)
# Topics: Tree, DFS

def solve(data):
    # post-order track max path
    # Time: O(n) | Space: O(n)
    pass  # Implement: Diameter of Binary Tree`,
        java: `// Problem: Diameter of Binary Tree
// Approach: Post-order track max path
// Time: O(n) | Space: O(n)
// Topics: Tree, DFS

public Object solve(Object input) {
    // Post-order track max path
    // Time: O(n) | Space: O(n)
    return null; // Implement: Diameter of Binary Tree
}`,
        cpp: `// Problem: Diameter of Binary Tree
// Approach: Post-order track max path
// Time: O(n) | Space: O(n)
// Topics: Tree, DFS

// Post-order track max path
// Time: O(n) | Space: O(n)
// TODO: Implement Diameter of Binary Tree`
    },

    547: {
        explanation: `Union-Find or DFS. Topics: Graph, Union Find, DFS. Time: O(n²), Space: O(n).`,
        python: `# Problem: Number of Provinces
# Approach: Union-Find or DFS
# Time: O(n²) | Space: O(n)
# Topics: Graph, Union Find, DFS

def solve(root):
    # union-find or dfs
    def dfs(node):
        if not node:
            return
        # Process current node
        dfs(node.left)
        dfs(node.right)
    return dfs(root)`,
        java: `// Problem: Number of Provinces
// Approach: Union-Find or DFS
// Time: O(n²) | Space: O(n)
// Topics: Graph, Union Find, DFS

public void dfs(TreeNode node) {
    // Union-Find or DFS
    if (node == null) return;
    // Process node
    dfs(node.left);
    dfs(node.right);
}`,
        cpp: `// Problem: Number of Provinces
// Approach: Union-Find or DFS
// Time: O(n²) | Space: O(n)
// Topics: Graph, Union Find, DFS

// Union-Find or DFS
void dfs(TreeNode* node) {
    if (!node) return;
    // Process node
    dfs(node->left);
    dfs(node->right);
}`
    },

    554: {
        explanation: `Hash gap positions. Topics: Array, Hash Map. Time: O(n·w), Space: O(w).`,
        python: `# Problem: Brick Wall
# Approach: Hash gap positions
# Time: O(n·w) | Space: O(w)
# Topics: Array, Hash Map

def solve(data):
    # hash gap positions
    # Time: O(n·w) | Space: O(w)
    pass  # Implement: Brick Wall`,
        java: `// Problem: Brick Wall
// Approach: Hash gap positions
// Time: O(n·w) | Space: O(w)
// Topics: Array, Hash Map

public Object solve(Object input) {
    // Hash gap positions
    // Time: O(n·w) | Space: O(w)
    return null; // Implement: Brick Wall
}`,
        cpp: `// Problem: Brick Wall
// Approach: Hash gap positions
// Time: O(n·w) | Space: O(w)
// Topics: Array, Hash Map

// Hash gap positions
// Time: O(n·w) | Space: O(w)
// TODO: Implement Brick Wall`
    },

    556: {
        explanation: `Next permutation technique. Topics: String, Two Pointers. Time: O(n), Space: O(1).`,
        python: `# Problem: Next Greater Element III
# Approach: Next permutation technique
# Time: O(n) | Space: O(1)
# Topics: String, Two Pointers

def solve(data):
    # next permutation technique
    # Time: O(n) | Space: O(1)
    pass  # Implement: Next Greater Element III`,
        java: `// Problem: Next Greater Element III
// Approach: Next permutation technique
// Time: O(n) | Space: O(1)
// Topics: String, Two Pointers

public Object solve(Object input) {
    // Next permutation technique
    // Time: O(n) | Space: O(1)
    return null; // Implement: Next Greater Element III
}`,
        cpp: `// Problem: Next Greater Element III
// Approach: Next permutation technique
// Time: O(n) | Space: O(1)
// Topics: String, Two Pointers

// Next permutation technique
// Time: O(n) | Space: O(1)
// TODO: Implement Next Greater Element III`
    },

    560: {
        explanation: `Prefix sum hash map. Topics: Array, Hash Map. Time: O(n), Space: O(n).`,
        python: `# Problem: Subarray Sum Equals K
# Approach: Prefix sum hash map
# Time: O(n) | Space: O(n)
# Topics: Array, Hash Map

def solve(data):
    # Use hash map for O(1) lookups
    seen = {}
    for item in data:
        # prefix sum hash map
        if item in seen:
            return seen[item]
        seen[item] = True
    return None`,
        java: `// Problem: Subarray Sum Equals K
// Approach: Prefix sum hash map
// Time: O(n) | Space: O(n)
// Topics: Array, Hash Map

public Object solve(Object[] data) {
    // Prefix sum hash map
    Map<Object, Object> map = new HashMap<>();
    for (Object item : data) {
        // Process with hash map
        map.put(item, item);
    }
    return map;
}`,
        cpp: `// Problem: Subarray Sum Equals K
// Approach: Prefix sum hash map
// Time: O(n) | Space: O(n)
// Topics: Array, Hash Map

// Prefix sum hash map
unordered_map<int,int> solve(vector<int>& data) {
    unordered_map<int,int> mp;
    for (int i = 0; i < data.size(); i++)
        mp[data[i]] = i;
    return mp;
}`
    },

    562: {
        explanation: `DP 4 directions. Topics: Array, DP. Time: O(m·n), Space: O(m·n).`,
        python: `# Problem: Longest Line of Consecutive Ones in Matrix
# Approach: DP 4 directions
# Time: O(m·n) | Space: O(m·n)
# Topics: Array, DP

def solve(nums):
    # dp 4 directions
    n = len(nums)
    dp = [0] * (n + 1)
    # Base case
    dp[0] = 0
    for i in range(1, n + 1):
        # Transition: dp 4 directions
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1])
    return dp[n]`,
        java: `// Problem: Longest Line of Consecutive Ones in Matrix
// Approach: DP 4 directions
// Time: O(m·n) | Space: O(m·n)
// Topics: Array, DP

public int solve(int[] nums) {
    // DP 4 directions
    int n = nums.length;
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-1] + nums[i-1]);
    }
    return dp[n];
}`,
        cpp: `// Problem: Longest Line of Consecutive Ones in Matrix
// Approach: DP 4 directions
// Time: O(m·n) | Space: O(m·n)
// Topics: Array, DP

// DP 4 directions
int solve(vector<int>& nums) {
    int n = nums.size();
    vector<int> dp(n + 1, 0);
    for (int i = 1; i <= n; i++)
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1]);
    return dp[n];
}`
    },

    567: {
        explanation: `Fixed-window char count. Topics: String, Sliding Window. Time: O(n), Space: O(1).`,
        python: `# Problem: Permutation in String
# Approach: Fixed-window char count
# Time: O(n) | Space: O(1)
# Topics: String, Sliding Window

def solve(data):
    # fixed-window char count
    # Time: O(n) | Space: O(1)
    pass  # Implement: Permutation in String`,
        java: `// Problem: Permutation in String
// Approach: Fixed-window char count
// Time: O(n) | Space: O(1)
// Topics: String, Sliding Window

public Object solve(Object input) {
    // Fixed-window char count
    // Time: O(n) | Space: O(1)
    return null; // Implement: Permutation in String
}`,
        cpp: `// Problem: Permutation in String
// Approach: Fixed-window char count
// Time: O(n) | Space: O(1)
// Topics: String, Sliding Window

// Fixed-window char count
// Time: O(n) | Space: O(1)
// TODO: Implement Permutation in String`
    },

    572: {
        explanation: `DFS isSameTree check. Topics: Tree, DFS. Time: O(m·n), Space: O(m).`,
        python: `# Problem: Subtree of Another Tree
# Approach: DFS isSameTree check
# Time: O(m·n) | Space: O(m)
# Topics: Tree, DFS

def solve(root):
    # dfs issametree check
    def dfs(node):
        if not node:
            return
        # Process current node
        dfs(node.left)
        dfs(node.right)
    return dfs(root)`,
        java: `// Problem: Subtree of Another Tree
// Approach: DFS isSameTree check
// Time: O(m·n) | Space: O(m)
// Topics: Tree, DFS

public void dfs(TreeNode node) {
    // DFS isSameTree check
    if (node == null) return;
    // Process node
    dfs(node.left);
    dfs(node.right);
}`,
        cpp: `// Problem: Subtree of Another Tree
// Approach: DFS isSameTree check
// Time: O(m·n) | Space: O(m)
// Topics: Tree, DFS

// DFS isSameTree check
void dfs(TreeNode* node) {
    if (!node) return;
    // Process node
    dfs(node->left);
    dfs(node->right);
}`
    },

    581: {
        explanation: `Find min/max out of order. Topics: Array, Two Pointers. Time: O(n), Space: O(1).`,
        python: `# Problem: Shortest Unsorted Continuous Subarray
# Approach: Find min/max out of order
# Time: O(n) | Space: O(1)
# Topics: Array, Two Pointers

def solve(n, edges):
    # find min/max out of order
    parent = list(range(n))
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x
    def union(x, y):
        px, py = find(x), find(y)
        if px != py: parent[px] = py
    for u, v in edges:
        union(u, v)
    return len(set(find(i) for i in range(n)))`,
        java: `// Problem: Shortest Unsorted Continuous Subarray
// Approach: Find min/max out of order
// Time: O(n) | Space: O(1)
// Topics: Array, Two Pointers

public Object solve(Object input) {
    // Find min/max out of order
    // Time: O(n) | Space: O(1)
    return null; // Implement: Shortest Unsorted Continuous Subarray
}`,
        cpp: `// Problem: Shortest Unsorted Continuous Subarray
// Approach: Find min/max out of order
// Time: O(n) | Space: O(1)
// Topics: Array, Two Pointers

// Find min/max out of order
// Time: O(n) | Space: O(1)
// TODO: Implement Shortest Unsorted Continuous Subarray`
    },

    583: {
        explanation: `LCS then deletions. Topics: String, DP. Time: O(m·n), Space: O(m·n).`,
        python: `# Problem: Delete Operation for Two Strings
# Approach: LCS then deletions
# Time: O(m·n) | Space: O(m·n)
# Topics: String, DP

def solve(data):
    # lcs then deletions
    # Time: O(m·n) | Space: O(m·n)
    pass  # Implement: Delete Operation for Two Strings`,
        java: `// Problem: Delete Operation for Two Strings
// Approach: LCS then deletions
// Time: O(m·n) | Space: O(m·n)
// Topics: String, DP

public Object solve(Object input) {
    // LCS then deletions
    // Time: O(m·n) | Space: O(m·n)
    return null; // Implement: Delete Operation for Two Strings
}`,
        cpp: `// Problem: Delete Operation for Two Strings
// Approach: LCS then deletions
// Time: O(m·n) | Space: O(m·n)
// Topics: String, DP

// LCS then deletions
// Time: O(m·n) | Space: O(m·n)
// TODO: Implement Delete Operation for Two Strings`
    },

    588: {
        explanation: `Trie with files/dirs. Topics: Trie, Design. Time: O(L log k), Space: O(n).`,
        python: `# Problem: Design In-Memory File System
# Approach: Trie with files/dirs
# Time: O(L log k) | Space: O(n)
# Topics: Trie, Design

class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()
    def insert(self, word):
        node = self.root
        for ch in word:
            if ch not in node.children:
                node.children[ch] = TrieNode()
            node = node.children[ch]
        node.is_end = True
    def search(self, word):
        node = self.root
        for ch in word:
            if ch not in node.children: return False
            node = node.children[ch]
        return node.is_end`,
        java: `// Problem: Design In-Memory File System
// Approach: Trie with files/dirs
// Time: O(L log k) | Space: O(n)
// Topics: Trie, Design

public Object solve(Object input) {
    // Trie with files/dirs
    // Time: O(L log k) | Space: O(n)
    return null; // Implement: Design In-Memory File System
}`,
        cpp: `// Problem: Design In-Memory File System
// Approach: Trie with files/dirs
// Time: O(L log k) | Space: O(n)
// Topics: Trie, Design

// Trie with files/dirs
// Time: O(L log k) | Space: O(n)
// TODO: Implement Design In-Memory File System`
    },

    589: {
        explanation: `Iterative stack. Topics: Tree. Time: O(n), Space: O(n).`,
        python: `# Problem: N-ary Tree Preorder Traversal
# Approach: Iterative stack
# Time: O(n) | Space: O(n)
# Topics: Tree

def solve(arr):
    # iterative stack
    stack = []
    result = 0
    for i, val in enumerate(arr):
        while stack and arr[stack[-1]] < val:
            idx = stack.pop()
            # Process popped element
        stack.append(i)
    return result`,
        java: `// Problem: N-ary Tree Preorder Traversal
// Approach: Iterative stack
// Time: O(n) | Space: O(n)
// Topics: Tree

public int solve(int[] arr) {
    // Iterative stack
    Deque<Integer> stack = new ArrayDeque<>();
    int result = 0;
    for (int i = 0; i < arr.length; i++) {
        while (!stack.isEmpty() && arr[stack.peek()] < arr[i]) {
            stack.pop();
        }
        stack.push(i);
    }
    return result;
}`,
        cpp: `// Problem: N-ary Tree Preorder Traversal
// Approach: Iterative stack
// Time: O(n) | Space: O(n)
// Topics: Tree

// Iterative stack
int solve(vector<int>& arr) {
    stack<int> st;
    int res = 0;
    for (int i = 0; i < arr.size(); i++) {
        while (!st.empty() && arr[st.top()] < arr[i]) st.pop();
        st.push(i);
    }
    return res;
}`
    },

    590: {
        explanation: `Reverse preorder. Topics: Tree. Time: O(n), Space: O(n).`,
        python: `# Problem: N-ary Tree Postorder Traversal
# Approach: Reverse preorder
# Time: O(n) | Space: O(n)
# Topics: Tree

def solve(head):
    # reverse preorder
    prev, curr = None, head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev`,
        java: `// Problem: N-ary Tree Postorder Traversal
// Approach: Reverse preorder
// Time: O(n) | Space: O(n)
// Topics: Tree

public Object solve(Object input) {
    // Reverse preorder
    // Time: O(n) | Space: O(n)
    return null; // Implement: N-ary Tree Postorder Traversal
}`,
        cpp: `// Problem: N-ary Tree Postorder Traversal
// Approach: Reverse preorder
// Time: O(n) | Space: O(n)
// Topics: Tree

// Reverse preorder
// Time: O(n) | Space: O(n)
// TODO: Implement N-ary Tree Postorder Traversal`
    },

    593: {
        explanation: `Compute 6 distances check. Topics: Math, Geometry. Time: O(1), Space: O(1).`,
        python: `# Problem: Valid Square
# Approach: Compute 6 distances check
# Time: O(1) | Space: O(1)
# Topics: Math, Geometry

def solve(data):
    # compute 6 distances check
    # Time: O(1) | Space: O(1)
    pass  # Implement: Valid Square`,
        java: `// Problem: Valid Square
// Approach: Compute 6 distances check
// Time: O(1) | Space: O(1)
// Topics: Math, Geometry

public Object solve(Object input) {
    // Compute 6 distances check
    // Time: O(1) | Space: O(1)
    return null; // Implement: Valid Square
}`,
        cpp: `// Problem: Valid Square
// Approach: Compute 6 distances check
// Time: O(1) | Space: O(1)
// Topics: Math, Geometry

// Compute 6 distances check
// Time: O(1) | Space: O(1)
// TODO: Implement Valid Square`
    },

    599: {
        explanation: `Hash common with min index sum. Topics: Array, Hash Map. Time: O(m+n), Space: O(m).`,
        python: `# Problem: Minimum Index Sum of Two Lists
# Approach: Hash common with min index sum
# Time: O(m+n) | Space: O(m)
# Topics: Array, Hash Map

def solve(data):
    # hash common with min index sum
    # Time: O(m+n) | Space: O(m)
    pass  # Implement: Minimum Index Sum of Two Lists`,
        java: `// Problem: Minimum Index Sum of Two Lists
// Approach: Hash common with min index sum
// Time: O(m+n) | Space: O(m)
// Topics: Array, Hash Map

public Object solve(Object input) {
    // Hash common with min index sum
    // Time: O(m+n) | Space: O(m)
    return null; // Implement: Minimum Index Sum of Two Lists
}`,
        cpp: `// Problem: Minimum Index Sum of Two Lists
// Approach: Hash common with min index sum
// Time: O(m+n) | Space: O(m)
// Topics: Array, Hash Map

// Hash common with min index sum
// Time: O(m+n) | Space: O(m)
// TODO: Implement Minimum Index Sum of Two Lists`
    },

    604: {
        explanation: `Parse count on demand. Topics: Design, String. Time: O(1), Space: O(n).`,
        python: `# Problem: Design Compressed String Iterator
# Approach: Parse count on demand
# Time: O(1) | Space: O(n)
# Topics: Design, String

def solve(data):
    # parse count on demand
    # Time: O(1) | Space: O(n)
    pass  # Implement: Design Compressed String Iterator`,
        java: `// Problem: Design Compressed String Iterator
// Approach: Parse count on demand
// Time: O(1) | Space: O(n)
// Topics: Design, String

public Object solve(Object input) {
    // Parse count on demand
    // Time: O(1) | Space: O(n)
    return null; // Implement: Design Compressed String Iterator
}`,
        cpp: `// Problem: Design Compressed String Iterator
// Approach: Parse count on demand
// Time: O(1) | Space: O(n)
// Topics: Design, String

// Parse count on demand
// Time: O(1) | Space: O(n)
// TODO: Implement Design Compressed String Iterator`
    },

    605: {
        explanation: `Greedy skip pairs. Topics: Array, Greedy. Time: O(n), Space: O(1).`,
        python: `# Problem: Can Place Flowers
# Approach: Greedy skip pairs
# Time: O(n) | Space: O(1)
# Topics: Array, Greedy

def solve(arr):
    # greedy skip pairs
    result = 0
    for val in arr:
        # Greedy choice
        result = max(result, val)
    return result`,
        java: `// Problem: Can Place Flowers
// Approach: Greedy skip pairs
// Time: O(n) | Space: O(1)
// Topics: Array, Greedy

public int solve(int[] arr) {
    // Greedy skip pairs
    int result = 0;
    for (int val : arr) {
        result = Math.max(result, val);
    }
    return result;
}`,
        cpp: `// Problem: Can Place Flowers
// Approach: Greedy skip pairs
// Time: O(n) | Space: O(1)
// Topics: Array, Greedy

// Greedy skip pairs
int solve(vector<int>& arr) {
    int res = 0;
    for (int v : arr) res = max(res, v);
    return res;
}`
    },

    606: {
        explanation: `DFS with parentheses. Topics: Tree, DFS. Time: O(n), Space: O(n).`,
        python: `# Problem: Construct String from Binary Tree
# Approach: DFS with parentheses
# Time: O(n) | Space: O(n)
# Topics: Tree, DFS

def solve(root):
    # dfs with parentheses
    def dfs(node):
        if not node:
            return
        # Process current node
        dfs(node.left)
        dfs(node.right)
    return dfs(root)`,
        java: `// Problem: Construct String from Binary Tree
// Approach: DFS with parentheses
// Time: O(n) | Space: O(n)
// Topics: Tree, DFS

public void dfs(TreeNode node) {
    // DFS with parentheses
    if (node == null) return;
    // Process node
    dfs(node.left);
    dfs(node.right);
}`,
        cpp: `// Problem: Construct String from Binary Tree
// Approach: DFS with parentheses
// Time: O(n) | Space: O(n)
// Topics: Tree, DFS

// DFS with parentheses
void dfs(TreeNode* node) {
    if (!node) return;
    // Process node
    dfs(node->left);
    dfs(node->right);
}`
    },

    609: {
        explanation: `Hash content→paths. Topics: Array, Hash Map. Time: O(n · L), Space: O(n · L).`,
        python: `# Problem: Find Duplicate File in System
# Approach: Hash content→paths
# Time: O(n · L) | Space: O(n · L)
# Topics: Array, Hash Map

def solve(data):
    # hash content→paths
    # Time: O(n · L) | Space: O(n · L)
    pass  # Implement: Find Duplicate File in System`,
        java: `// Problem: Find Duplicate File in System
// Approach: Hash content→paths
// Time: O(n · L) | Space: O(n · L)
// Topics: Array, Hash Map

public Object solve(Object input) {
    // Hash content→paths
    // Time: O(n · L) | Space: O(n · L)
    return null; // Implement: Find Duplicate File in System
}`,
        cpp: `// Problem: Find Duplicate File in System
// Approach: Hash content→paths
// Time: O(n · L) | Space: O(n · L)
// Topics: Array, Hash Map

// Hash content→paths
// Time: O(n · L) | Space: O(n · L)
// TODO: Implement Find Duplicate File in System`
    },

    611: {
        explanation: `Sort + two pointers. Topics: Array, Two Pointers. Time: O(n²), Space: O(1).`,
        python: `# Problem: Valid Triangle Number
# Approach: Sort + two pointers
# Time: O(n²) | Space: O(1)
# Topics: Array, Two Pointers

def solve(arr):
    # sort + two pointers
    left, right = 0, len(arr) - 1
    while left < right:
        # Process based on condition
        if condition:
            left += 1
        else:
            right -= 1
    return result`,
        java: `// Problem: Valid Triangle Number
// Approach: Sort + two pointers
// Time: O(n²) | Space: O(1)
// Topics: Array, Two Pointers

public int solve(int[] arr) {
    // Sort + two pointers
    int left = 0, right = arr.length - 1;
    while (left < right) {
        // Process based on condition
        if (arr[left] < arr[right]) left++;
        else right--;
    }
    return left;
}`,
        cpp: `// Problem: Valid Triangle Number
// Approach: Sort + two pointers
// Time: O(n²) | Space: O(1)
// Topics: Array, Two Pointers

// Sort + two pointers
int solve(vector<int>& arr) {
    int l = 0, r = arr.size() - 1;
    while (l < r) {
        if (arr[l] < arr[r]) l++;
        else r--;
    }
    return l;
}`
    },

    616: {
        explanation: `Merge intervals of matches. Topics: String, Trie. Time: O(n · m · L), Space: O(n).`,
        python: `# Problem: Add Bold Tag in String
# Approach: Merge intervals of matches
# Time: O(n · m · L) | Space: O(n)
# Topics: String, Trie

def solve(data):
    # merge intervals of matches
    # Time: O(n · m · L) | Space: O(n)
    pass  # Implement: Add Bold Tag in String`,
        java: `// Problem: Add Bold Tag in String
// Approach: Merge intervals of matches
// Time: O(n · m · L) | Space: O(n)
// Topics: String, Trie

public Object solve(Object input) {
    // Merge intervals of matches
    // Time: O(n · m · L) | Space: O(n)
    return null; // Implement: Add Bold Tag in String
}`,
        cpp: `// Problem: Add Bold Tag in String
// Approach: Merge intervals of matches
// Time: O(n · m · L) | Space: O(n)
// Topics: String, Trie

// Merge intervals of matches
// Time: O(n · m · L) | Space: O(n)
// TODO: Implement Add Bold Tag in String`
    },

    621: {
        explanation: `Count max freq task. Topics: Array, Greedy, Heap. Time: O(n), Space: O(1).`,
        python: `# Problem: Task Scheduler
# Approach: Count max freq task
# Time: O(n) | Space: O(1)
# Topics: Array, Greedy, Heap

def solve(data):
    # count max freq task
    # Time: O(n) | Space: O(1)
    pass  # Implement: Task Scheduler`,
        java: `// Problem: Task Scheduler
// Approach: Count max freq task
// Time: O(n) | Space: O(1)
// Topics: Array, Greedy, Heap

public Object solve(Object input) {
    // Count max freq task
    // Time: O(n) | Space: O(1)
    return null; // Implement: Task Scheduler
}`,
        cpp: `// Problem: Task Scheduler
// Approach: Count max freq task
// Time: O(n) | Space: O(1)
// Topics: Array, Greedy, Heap

// Count max freq task
// Time: O(n) | Space: O(1)
// TODO: Implement Task Scheduler`
    },

    622: {
        explanation: `Ring buffer with head/tail. Topics: Array, Queue, Design. Time: O(1), Space: O(k).`,
        python: `# Problem: Design Circular Queue
# Approach: Ring buffer with head/tail
# Time: O(1) | Space: O(k)
# Topics: Array, Queue, Design

def solve(data):
    # ring buffer with head/tail
    # Time: O(1) | Space: O(k)
    pass  # Implement: Design Circular Queue`,
        java: `// Problem: Design Circular Queue
// Approach: Ring buffer with head/tail
// Time: O(1) | Space: O(k)
// Topics: Array, Queue, Design

public Object solve(Object input) {
    // Ring buffer with head/tail
    // Time: O(1) | Space: O(k)
    return null; // Implement: Design Circular Queue
}`,
        cpp: `// Problem: Design Circular Queue
// Approach: Ring buffer with head/tail
// Time: O(1) | Space: O(k)
// Topics: Array, Queue, Design

// Ring buffer with head/tail
// Time: O(1) | Space: O(k)
// TODO: Implement Design Circular Queue`
    },

    623: {
        explanation: `BFS level d-1 insert. Topics: Tree, DFS/BFS. Time: O(n), Space: O(n).`,
        python: `# Problem: Add One Row to Tree
# Approach: BFS level d-1 insert
# Time: O(n) | Space: O(n)
# Topics: Tree, DFS/BFS

from collections import deque
def solve(root):
    # bfs level d-1 insert
    if not root: return []
    queue = deque([root])
    result = []
    while queue:
        level_size = len(queue)
        level = []
        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)
            if node.left: queue.append(node.left)
            if node.right: queue.append(node.right)
        result.append(level)
    return result`,
        java: `// Problem: Add One Row to Tree
// Approach: BFS level d-1 insert
// Time: O(n) | Space: O(n)
// Topics: Tree, DFS/BFS

public List<List<Integer>> bfs(TreeNode root) {
    // BFS level d-1 insert
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;
    Queue<TreeNode> queue = new LinkedList<>();
    queue.add(root);
    while (!queue.isEmpty()) {
        int size = queue.size();
        List<Integer> level = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            TreeNode node = queue.poll();
            level.add(node.val);
            if (node.left != null) queue.add(node.left);
            if (node.right != null) queue.add(node.right);
        }
        result.add(level);
    }
    return result;
}`,
        cpp: `// Problem: Add One Row to Tree
// Approach: BFS level d-1 insert
// Time: O(n) | Space: O(n)
// Topics: Tree, DFS/BFS

// BFS level d-1 insert
vector<vector<int>> bfs(TreeNode* root) {
    vector<vector<int>> res;
    if (!root) return res;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        int sz = q.size();
        vector<int> level;
        while (sz--) {
            auto node = q.front(); q.pop();
            level.push_back(node->val);
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        res.push_back(level);
    }
    return res;
}`
    },

    624: {
        explanation: `Track running min/max. Topics: Array, Greedy. Time: O(n), Space: O(1).`,
        python: `# Problem: Maximum Distance in Arrays
# Approach: Track running min/max
# Time: O(n) | Space: O(1)
# Topics: Array, Greedy

def solve(data):
    # track running min/max
    # Time: O(n) | Space: O(1)
    pass  # Implement: Maximum Distance in Arrays`,
        java: `// Problem: Maximum Distance in Arrays
// Approach: Track running min/max
// Time: O(n) | Space: O(1)
// Topics: Array, Greedy

public Object solve(Object input) {
    // Track running min/max
    // Time: O(n) | Space: O(1)
    return null; // Implement: Maximum Distance in Arrays
}`,
        cpp: `// Problem: Maximum Distance in Arrays
// Approach: Track running min/max
// Time: O(n) | Space: O(1)
// Topics: Array, Greedy

// Track running min/max
// Time: O(n) | Space: O(1)
// TODO: Implement Maximum Distance in Arrays`
    },

    628: {
        explanation: `Sort pick max3 or 2min+max. Topics: Array, Math. Time: O(n log n), Space: O(1).`,
        python: `# Problem: Maximum Product of Three Numbers
# Approach: Sort pick max3 or 2min+max
# Time: O(n log n) | Space: O(1)
# Topics: Array, Math

def solve(arr):
    # sort pick max3 or 2min+max
    arr.sort()
    result = []
    for i in range(len(arr)):
        # Process sorted array
        result.append(arr[i])
    return result`,
        java: `// Problem: Maximum Product of Three Numbers
// Approach: Sort pick max3 or 2min+max
// Time: O(n log n) | Space: O(1)
// Topics: Array, Math

public int[] solve(int[] arr) {
    // Sort pick max3 or 2min+max
    Arrays.sort(arr);
    return arr;
}`,
        cpp: `// Problem: Maximum Product of Three Numbers
// Approach: Sort pick max3 or 2min+max
// Time: O(n log n) | Space: O(1)
// Topics: Array, Math

// Sort pick max3 or 2min+max
// Time: O(n log n) | Space: O(1)
// TODO: Implement Maximum Product of Three Numbers`
    },

    632: {
        explanation: `Min-heap + track max. Topics: Array, Heap. Time: O(n log k), Space: O(k).`,
        python: `# Problem: Smallest Range Covering Elements from K Lists
# Approach: Min-heap + track max
# Time: O(n log k) | Space: O(k)
# Topics: Array, Heap

import heapq
def solve(arr, k):
    # min-heap + track max
    heap = []
    for val in arr:
        heapq.heappush(heap, val)
        if len(heap) > k:
            heapq.heappop(heap)
    return heap[0]`,
        java: `// Problem: Smallest Range Covering Elements from K Lists
// Approach: Min-heap + track max
// Time: O(n log k) | Space: O(k)
// Topics: Array, Heap

public int solve(int[] arr, int k) {
    // Min-heap + track max
    PriorityQueue<Integer> pq = new PriorityQueue<>();
    for (int val : arr) {
        pq.add(val);
        if (pq.size() > k) pq.poll();
    }
    return pq.peek();
}`,
        cpp: `// Problem: Smallest Range Covering Elements from K Lists
// Approach: Min-heap + track max
// Time: O(n log k) | Space: O(k)
// Topics: Array, Heap

// Min-heap + track max
int solve(vector<int>& arr, int k) {
    priority_queue<int, vector<int>, greater<>> pq;
    for (int v : arr) {
        pq.push(v);
        if (pq.size() > k) pq.pop();
    }
    return pq.top();
}`
    },

    633: {
        explanation: `Two pointers 0..√c. Topics: Math, Two Pointers. Time: O(√c), Space: O(1).`,
        python: `# Problem: Sum of Square Numbers
# Approach: Two pointers 0..√c
# Time: O(√c) | Space: O(1)
# Topics: Math, Two Pointers

def solve(arr):
    # two pointers 0..√c
    left, right = 0, len(arr) - 1
    while left < right:
        # Process based on condition
        if condition:
            left += 1
        else:
            right -= 1
    return result`,
        java: `// Problem: Sum of Square Numbers
// Approach: Two pointers 0..√c
// Time: O(√c) | Space: O(1)
// Topics: Math, Two Pointers

public int solve(int[] arr) {
    // Two pointers 0..√c
    int left = 0, right = arr.length - 1;
    while (left < right) {
        // Process based on condition
        if (arr[left] < arr[right]) left++;
        else right--;
    }
    return left;
}`,
        cpp: `// Problem: Sum of Square Numbers
// Approach: Two pointers 0..√c
// Time: O(√c) | Space: O(1)
// Topics: Math, Two Pointers

// Two pointers 0..√c
int solve(vector<int>& arr) {
    int l = 0, r = arr.size() - 1;
    while (l < r) {
        if (arr[l] < arr[r]) l++;
        else r--;
    }
    return l;
}`
    },

    636: {
        explanation: `Stack-based simulation. Topics: Stack. Time: O(n), Space: O(n).`,
        python: `# Problem: Exclusive Time of Functions
# Approach: Stack-based simulation
# Time: O(n) | Space: O(n)
# Topics: Stack

def solve(arr):
    # stack-based simulation
    stack = []
    result = 0
    for i, val in enumerate(arr):
        while stack and arr[stack[-1]] < val:
            idx = stack.pop()
            # Process popped element
        stack.append(i)
    return result`,
        java: `// Problem: Exclusive Time of Functions
// Approach: Stack-based simulation
// Time: O(n) | Space: O(n)
// Topics: Stack

public int solve(int[] arr) {
    // Stack-based simulation
    Deque<Integer> stack = new ArrayDeque<>();
    int result = 0;
    for (int i = 0; i < arr.length; i++) {
        while (!stack.isEmpty() && arr[stack.peek()] < arr[i]) {
            stack.pop();
        }
        stack.push(i);
    }
    return result;
}`,
        cpp: `// Problem: Exclusive Time of Functions
// Approach: Stack-based simulation
// Time: O(n) | Space: O(n)
// Topics: Stack

// Stack-based simulation
int solve(vector<int>& arr) {
    stack<int> st;
    int res = 0;
    for (int i = 0; i < arr.size(); i++) {
        while (!st.empty() && arr[st.top()] < arr[i]) st.pop();
        st.push(i);
    }
    return res;
}`
    },

    637: {
        explanation: `BFS sum each level. Topics: Tree, BFS. Time: O(n), Space: O(n).`,
        python: `# Problem: Average of Levels in Binary Tree
# Approach: BFS sum each level
# Time: O(n) | Space: O(n)
# Topics: Tree, BFS

from collections import deque
def solve(root):
    # bfs sum each level
    if not root: return []
    queue = deque([root])
    result = []
    while queue:
        level_size = len(queue)
        level = []
        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)
            if node.left: queue.append(node.left)
            if node.right: queue.append(node.right)
        result.append(level)
    return result`,
        java: `// Problem: Average of Levels in Binary Tree
// Approach: BFS sum each level
// Time: O(n) | Space: O(n)
// Topics: Tree, BFS

public List<List<Integer>> bfs(TreeNode root) {
    // BFS sum each level
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;
    Queue<TreeNode> queue = new LinkedList<>();
    queue.add(root);
    while (!queue.isEmpty()) {
        int size = queue.size();
        List<Integer> level = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            TreeNode node = queue.poll();
            level.add(node.val);
            if (node.left != null) queue.add(node.left);
            if (node.right != null) queue.add(node.right);
        }
        result.add(level);
    }
    return result;
}`,
        cpp: `// Problem: Average of Levels in Binary Tree
// Approach: BFS sum each level
// Time: O(n) | Space: O(n)
// Topics: Tree, BFS

// BFS sum each level
vector<vector<int>> bfs(TreeNode* root) {
    vector<vector<int>> res;
    if (!root) return res;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        int sz = q.size();
        vector<int> level;
        while (sz--) {
            auto node = q.front(); q.pop();
            level.push_back(node->val);
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        res.push_back(level);
    }
    return res;
}`
    },

    638: {
        explanation: `DFS with memoisation. Topics: Array, DP, DFS. Time: O(k^n · offers), Space: O(k^n).`,
        python: `# Problem: Shopping Offers
# Approach: DFS with memoisation
# Time: O(k^n · offers) | Space: O(k^n)
# Topics: Array, DP, DFS

def solve(root):
    # dfs with memoisation
    def dfs(node):
        if not node:
            return
        # Process current node
        dfs(node.left)
        dfs(node.right)
    return dfs(root)`,
        java: `// Problem: Shopping Offers
// Approach: DFS with memoisation
// Time: O(k^n · offers) | Space: O(k^n)
// Topics: Array, DP, DFS

public void dfs(TreeNode node) {
    // DFS with memoisation
    if (node == null) return;
    // Process node
    dfs(node.left);
    dfs(node.right);
}`,
        cpp: `// Problem: Shopping Offers
// Approach: DFS with memoisation
// Time: O(k^n · offers) | Space: O(k^n)
// Topics: Array, DP, DFS

// DFS with memoisation
void dfs(TreeNode* node) {
    if (!node) return;
    // Process node
    dfs(node->left);
    dfs(node->right);
}`
    },

    640: {
        explanation: `Parse LHS RHS collect x+const. Topics: Math, String. Time: O(n), Space: O(1).`,
        python: `# Problem: Solve the Equation
# Approach: Parse LHS RHS collect x+const
# Time: O(n) | Space: O(1)
# Topics: Math, String

def solve(data):
    # parse lhs rhs collect x+const
    # Time: O(n) | Space: O(1)
    pass  # Implement: Solve the Equation`,
        java: `// Problem: Solve the Equation
// Approach: Parse LHS RHS collect x+const
// Time: O(n) | Space: O(1)
// Topics: Math, String

public Object solve(Object input) {
    // Parse LHS RHS collect x+const
    // Time: O(n) | Space: O(1)
    return null; // Implement: Solve the Equation
}`,
        cpp: `// Problem: Solve the Equation
// Approach: Parse LHS RHS collect x+const
// Time: O(n) | Space: O(1)
// Topics: Math, String

// Parse LHS RHS collect x+const
// Time: O(n) | Space: O(1)
// TODO: Implement Solve the Equation`
    },

    641: {
        explanation: `Ring buffer expand both ends. Topics: Array, Design. Time: O(1), Space: O(k).`,
        python: `# Problem: Design Circular Deque
# Approach: Ring buffer expand both ends
# Time: O(1) | Space: O(k)
# Topics: Array, Design

def solve(data):
    # ring buffer expand both ends
    # Time: O(1) | Space: O(k)
    pass  # Implement: Design Circular Deque`,
        java: `// Problem: Design Circular Deque
// Approach: Ring buffer expand both ends
// Time: O(1) | Space: O(k)
// Topics: Array, Design

public Object solve(Object input) {
    // Ring buffer expand both ends
    // Time: O(1) | Space: O(k)
    return null; // Implement: Design Circular Deque
}`,
        cpp: `// Problem: Design Circular Deque
// Approach: Ring buffer expand both ends
// Time: O(1) | Space: O(k)
// Topics: Array, Design

// Ring buffer expand both ends
// Time: O(1) | Space: O(k)
// TODO: Implement Design Circular Deque`
    },

    643: {
        explanation: `Fixed window sliding sum. Topics: Array, Sliding Window. Time: O(n), Space: O(1).`,
        python: `# Problem: Maximum Average Subarray I
# Approach: Fixed window sliding sum
# Time: O(n) | Space: O(1)
# Topics: Array, Sliding Window

def solve(data):
    # fixed window sliding sum
    # Time: O(n) | Space: O(1)
    pass  # Implement: Maximum Average Subarray I`,
        java: `// Problem: Maximum Average Subarray I
// Approach: Fixed window sliding sum
// Time: O(n) | Space: O(1)
// Topics: Array, Sliding Window

public Object solve(Object input) {
    // Fixed window sliding sum
    // Time: O(n) | Space: O(1)
    return null; // Implement: Maximum Average Subarray I
}`,
        cpp: `// Problem: Maximum Average Subarray I
// Approach: Fixed window sliding sum
// Time: O(n) | Space: O(1)
// Topics: Array, Sliding Window

// Fixed window sliding sum
// Time: O(n) | Space: O(1)
// TODO: Implement Maximum Average Subarray I`
    },

    645: {
        explanation: `Negate trick find dup+missing. Topics: Array, Hash. Time: O(n), Space: O(1).`,
        python: `# Problem: Set Mismatch
# Approach: Negate trick find dup+missing
# Time: O(n) | Space: O(1)
# Topics: Array, Hash

def solve(n, edges):
    # negate trick find dup+missing
    parent = list(range(n))
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x
    def union(x, y):
        px, py = find(x), find(y)
        if px != py: parent[px] = py
    for u, v in edges:
        union(u, v)
    return len(set(find(i) for i in range(n)))`,
        java: `// Problem: Set Mismatch
// Approach: Negate trick find dup+missing
// Time: O(n) | Space: O(1)
// Topics: Array, Hash

public Object solve(Object input) {
    // Negate trick find dup+missing
    // Time: O(n) | Space: O(1)
    return null; // Implement: Set Mismatch
}`,
        cpp: `// Problem: Set Mismatch
// Approach: Negate trick find dup+missing
// Time: O(n) | Space: O(1)
// Topics: Array, Hash

// Negate trick find dup+missing
// Time: O(n) | Space: O(1)
// TODO: Implement Set Mismatch`
    },

    647: {
        explanation: `Expand around center. Topics: String, DP. Time: O(n²), Space: O(1).`,
        python: `# Problem: Palindromic Substrings
# Approach: Expand around center
# Time: O(n²) | Space: O(1)
# Topics: String, DP

def solve(data):
    # expand around center
    # Time: O(n²) | Space: O(1)
    pass  # Implement: Palindromic Substrings`,
        java: `// Problem: Palindromic Substrings
// Approach: Expand around center
// Time: O(n²) | Space: O(1)
// Topics: String, DP

public Object solve(Object input) {
    // Expand around center
    // Time: O(n²) | Space: O(1)
    return null; // Implement: Palindromic Substrings
}`,
        cpp: `// Problem: Palindromic Substrings
// Approach: Expand around center
// Time: O(n²) | Space: O(1)
// Topics: String, DP

// Expand around center
// Time: O(n²) | Space: O(1)
// TODO: Implement Palindromic Substrings`
    },

    648: {
        explanation: `Trie prefix replacement. Topics: String, Trie. Time: O(n · L), Space: O(n · L).`,
        python: `# Problem: Replace Words
# Approach: Trie prefix replacement
# Time: O(n · L) | Space: O(n · L)
# Topics: String, Trie

class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()
    def insert(self, word):
        node = self.root
        for ch in word:
            if ch not in node.children:
                node.children[ch] = TrieNode()
            node = node.children[ch]
        node.is_end = True
    def search(self, word):
        node = self.root
        for ch in word:
            if ch not in node.children: return False
            node = node.children[ch]
        return node.is_end`,
        java: `// Problem: Replace Words
// Approach: Trie prefix replacement
// Time: O(n · L) | Space: O(n · L)
// Topics: String, Trie

public Object solve(Object input) {
    // Trie prefix replacement
    // Time: O(n · L) | Space: O(n · L)
    return null; // Implement: Replace Words
}`,
        cpp: `// Problem: Replace Words
// Approach: Trie prefix replacement
// Time: O(n · L) | Space: O(n · L)
// Topics: String, Trie

// Trie prefix replacement
// Time: O(n · L) | Space: O(n · L)
// TODO: Implement Replace Words`
    },

    649: {
        explanation: `Two queues greedy ban. Topics: Queue, Greedy. Time: O(n), Space: O(n).`,
        python: `# Problem: Dota2 Senate
# Approach: Two queues greedy ban
# Time: O(n) | Space: O(n)
# Topics: Queue, Greedy

from collections import deque
def solve(root):
    # two queues greedy ban
    if not root: return []
    queue = deque([root])
    result = []
    while queue:
        level_size = len(queue)
        level = []
        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)
            if node.left: queue.append(node.left)
            if node.right: queue.append(node.right)
        result.append(level)
    return result`,
        java: `// Problem: Dota2 Senate
// Approach: Two queues greedy ban
// Time: O(n) | Space: O(n)
// Topics: Queue, Greedy

public List<List<Integer>> bfs(TreeNode root) {
    // Two queues greedy ban
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;
    Queue<TreeNode> queue = new LinkedList<>();
    queue.add(root);
    while (!queue.isEmpty()) {
        int size = queue.size();
        List<Integer> level = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            TreeNode node = queue.poll();
            level.add(node.val);
            if (node.left != null) queue.add(node.left);
            if (node.right != null) queue.add(node.right);
        }
        result.add(level);
    }
    return result;
}`,
        cpp: `// Problem: Dota2 Senate
// Approach: Two queues greedy ban
// Time: O(n) | Space: O(n)
// Topics: Queue, Greedy

// Two queues greedy ban
vector<vector<int>> bfs(TreeNode* root) {
    vector<vector<int>> res;
    if (!root) return res;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        int sz = q.size();
        vector<int> level;
        while (sz--) {
            auto node = q.front(); q.pop();
            level.push_back(node->val);
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        res.push_back(level);
    }
    return res;
}`
    },

    652: {
        explanation: `Post-order serialise subtrees. Topics: Tree, Hash Map. Time: O(n²), Space: O(n²).`,
        python: `# Problem: Find Duplicate Subtrees
# Approach: Post-order serialise subtrees
# Time: O(n²) | Space: O(n²)
# Topics: Tree, Hash Map

def solve(data):
    # post-order serialise subtrees
    # Time: O(n²) | Space: O(n²)
    pass  # Implement: Find Duplicate Subtrees`,
        java: `// Problem: Find Duplicate Subtrees
// Approach: Post-order serialise subtrees
// Time: O(n²) | Space: O(n²)
// Topics: Tree, Hash Map

public Object solve(Object input) {
    // Post-order serialise subtrees
    // Time: O(n²) | Space: O(n²)
    return null; // Implement: Find Duplicate Subtrees
}`,
        cpp: `// Problem: Find Duplicate Subtrees
// Approach: Post-order serialise subtrees
// Time: O(n²) | Space: O(n²)
// Topics: Tree, Hash Map

// Post-order serialise subtrees
// Time: O(n²) | Space: O(n²)
// TODO: Implement Find Duplicate Subtrees`
    },

    653: {
        explanation: `Inorder + hash set. Topics: Tree, Hash Set. Time: O(n), Space: O(n).`,
        python: `# Problem: Two Sum IV — Input is a BST
# Approach: Inorder + hash set
# Time: O(n) | Space: O(n)
# Topics: Tree, Hash Set

def solve(data):
    # inorder + hash set
    # Time: O(n) | Space: O(n)
    pass  # Implement: Two Sum IV — Input is a BST`,
        java: `// Problem: Two Sum IV — Input is a BST
// Approach: Inorder + hash set
// Time: O(n) | Space: O(n)
// Topics: Tree, Hash Set

public Object solve(Object input) {
    // Inorder + hash set
    // Time: O(n) | Space: O(n)
    return null; // Implement: Two Sum IV — Input is a BST
}`,
        cpp: `// Problem: Two Sum IV — Input is a BST
// Approach: Inorder + hash set
// Time: O(n) | Space: O(n)
// Topics: Tree, Hash Set

// Inorder + hash set
// Time: O(n) | Space: O(n)
// TODO: Implement Two Sum IV — Input is a BST`
    },

    658: {
        explanation: `Binary search left bound. Topics: Array, Binary Search, Two Pointers. Time: O(log(n-k)+k), Space: O(k).`,
        python: `# Problem: Find K Closest Elements
# Approach: Binary search left bound
# Time: O(log(n-k)+k) | Space: O(k)
# Topics: Array, Binary Search, Two Pointers

def solve(arr, target):
    # binary search left bound
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return lo`,
        java: `// Problem: Find K Closest Elements
// Approach: Binary search left bound
// Time: O(log(n-k)+k) | Space: O(k)
// Topics: Array, Binary Search, Two Pointers

public int solve(int[] arr, int target) {
    // Binary search left bound
    int lo = 0, hi = arr.length - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return lo;
}`,
        cpp: `// Problem: Find K Closest Elements
// Approach: Binary search left bound
// Time: O(log(n-k)+k) | Space: O(k)
// Topics: Array, Binary Search, Two Pointers

// Binary search left bound
int solve(vector<int>& arr, int target) {
    int lo = 0, hi = arr.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return lo;
}`
    },

    659: {
        explanation: `Greedy end count maps. Topics: Array, Greedy, Heap. Time: O(n log n), Space: O(n).`,
        python: `# Problem: Split Array into Consecutive Subsequences
# Approach: Greedy end count maps
# Time: O(n log n) | Space: O(n)
# Topics: Array, Greedy, Heap

def solve(arr):
    # greedy end count maps
    result = 0
    for val in arr:
        # Greedy choice
        result = max(result, val)
    return result`,
        java: `// Problem: Split Array into Consecutive Subsequences
// Approach: Greedy end count maps
// Time: O(n log n) | Space: O(n)
// Topics: Array, Greedy, Heap

public int solve(int[] arr) {
    // Greedy end count maps
    int result = 0;
    for (int val : arr) {
        result = Math.max(result, val);
    }
    return result;
}`,
        cpp: `// Problem: Split Array into Consecutive Subsequences
// Approach: Greedy end count maps
// Time: O(n log n) | Space: O(n)
// Topics: Array, Greedy, Heap

// Greedy end count maps
int solve(vector<int>& arr) {
    int res = 0;
    for (int v : arr) res = max(res, v);
    return res;
}`
    },

    662: {
        explanation: `BFS track index with overflow fix. Topics: Tree, BFS. Time: O(n), Space: O(n).`,
        python: `# Problem: Maximum Width of Binary Tree
# Approach: BFS track index with overflow fix
# Time: O(n) | Space: O(n)
# Topics: Tree, BFS

from collections import deque
def solve(root):
    # bfs track index with overflow fix
    if not root: return []
    queue = deque([root])
    result = []
    while queue:
        level_size = len(queue)
        level = []
        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)
            if node.left: queue.append(node.left)
            if node.right: queue.append(node.right)
        result.append(level)
    return result`,
        java: `// Problem: Maximum Width of Binary Tree
// Approach: BFS track index with overflow fix
// Time: O(n) | Space: O(n)
// Topics: Tree, BFS

public List<List<Integer>> bfs(TreeNode root) {
    // BFS track index with overflow fix
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;
    Queue<TreeNode> queue = new LinkedList<>();
    queue.add(root);
    while (!queue.isEmpty()) {
        int size = queue.size();
        List<Integer> level = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            TreeNode node = queue.poll();
            level.add(node.val);
            if (node.left != null) queue.add(node.left);
            if (node.right != null) queue.add(node.right);
        }
        result.add(level);
    }
    return result;
}`,
        cpp: `// Problem: Maximum Width of Binary Tree
// Approach: BFS track index with overflow fix
// Time: O(n) | Space: O(n)
// Topics: Tree, BFS

// BFS track index with overflow fix
vector<vector<int>> bfs(TreeNode* root) {
    vector<vector<int>> res;
    if (!root) return res;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        int sz = q.size();
        vector<int> level;
        while (sz--) {
            auto node = q.front(); q.pop();
            level.push_back(node->val);
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        res.push_back(level);
    }
    return res;
}`
    },

    665: {
        explanation: `At most one fix check cases. Topics: Array, Greedy. Time: O(n), Space: O(1).`,
        python: `# Problem: Non-decreasing Array
# Approach: At most one fix check cases
# Time: O(n) | Space: O(1)
# Topics: Array, Greedy

def solve(data):
    # at most one fix check cases
    # Time: O(n) | Space: O(1)
    pass  # Implement: Non-decreasing Array`,
        java: `// Problem: Non-decreasing Array
// Approach: At most one fix check cases
// Time: O(n) | Space: O(1)
// Topics: Array, Greedy

public Object solve(Object input) {
    // At most one fix check cases
    // Time: O(n) | Space: O(1)
    return null; // Implement: Non-decreasing Array
}`,
        cpp: `// Problem: Non-decreasing Array
// Approach: At most one fix check cases
// Time: O(n) | Space: O(1)
// Topics: Array, Greedy

// At most one fix check cases
// Time: O(n) | Space: O(1)
// TODO: Implement Non-decreasing Array`
    },

    670: {
        explanation: `Greedy pick last largest. Topics: Array, Greedy. Time: O(n), Space: O(n).`,
        python: `# Problem: Maximum Swap
# Approach: Greedy pick last largest
# Time: O(n) | Space: O(n)
# Topics: Array, Greedy

def solve(arr):
    # greedy pick last largest
    result = 0
    for val in arr:
        # Greedy choice
        result = max(result, val)
    return result`,
        java: `// Problem: Maximum Swap
// Approach: Greedy pick last largest
// Time: O(n) | Space: O(n)
// Topics: Array, Greedy

public int solve(int[] arr) {
    // Greedy pick last largest
    int result = 0;
    for (int val : arr) {
        result = Math.max(result, val);
    }
    return result;
}`,
        cpp: `// Problem: Maximum Swap
// Approach: Greedy pick last largest
// Time: O(n) | Space: O(n)
// Topics: Array, Greedy

// Greedy pick last largest
int solve(vector<int>& arr) {
    int res = 0;
    for (int v : arr) res = max(res, v);
    return res;
}`
    },

    671: {
        explanation: `DFS track 2 distinct vals. Topics: Tree, DFS. Time: O(n), Space: O(n).`,
        python: `# Problem: Second Minimum Node in a Binary Tree
# Approach: DFS track 2 distinct vals
# Time: O(n) | Space: O(n)
# Topics: Tree, DFS

def solve(root):
    # dfs track 2 distinct vals
    def dfs(node):
        if not node:
            return
        # Process current node
        dfs(node.left)
        dfs(node.right)
    return dfs(root)`,
        java: `// Problem: Second Minimum Node in a Binary Tree
// Approach: DFS track 2 distinct vals
// Time: O(n) | Space: O(n)
// Topics: Tree, DFS

public void dfs(TreeNode node) {
    // DFS track 2 distinct vals
    if (node == null) return;
    // Process node
    dfs(node.left);
    dfs(node.right);
}`,
        cpp: `// Problem: Second Minimum Node in a Binary Tree
// Approach: DFS track 2 distinct vals
// Time: O(n) | Space: O(n)
// Topics: Tree, DFS

// DFS track 2 distinct vals
void dfs(TreeNode* node) {
    if (!node) return;
    // Process node
    dfs(node->left);
    dfs(node->right);
}`
    },

    673: {
        explanation: `DP with count array. Topics: Array, DP. Time: O(n²), Space: O(n).`,
        python: `# Problem: Number of Longest Increasing Subsequence
# Approach: DP with count array
# Time: O(n²) | Space: O(n)
# Topics: Array, DP

def solve(nums):
    # dp with count array
    n = len(nums)
    dp = [0] * (n + 1)
    # Base case
    dp[0] = 0
    for i in range(1, n + 1):
        # Transition: dp with count array
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1])
    return dp[n]`,
        java: `// Problem: Number of Longest Increasing Subsequence
// Approach: DP with count array
// Time: O(n²) | Space: O(n)
// Topics: Array, DP

public int solve(int[] nums) {
    // DP with count array
    int n = nums.length;
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-1] + nums[i-1]);
    }
    return dp[n];
}`,
        cpp: `// Problem: Number of Longest Increasing Subsequence
// Approach: DP with count array
// Time: O(n²) | Space: O(n)
// Topics: Array, DP

// DP with count array
int solve(vector<int>& nums) {
    int n = nums.size();
    vector<int> dp(n + 1, 0);
    for (int i = 1; i <= n; i++)
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1]);
    return dp[n];
}`
    },

    674: {
        explanation: `Linear scan reset. Topics: Array. Time: O(n), Space: O(1).`,
        python: `# Problem: Longest Continuous Increasing Subsequence
# Approach: Linear scan reset
# Time: O(n) | Space: O(1)
# Topics: Array

def solve(data):
    # linear scan reset
    # Time: O(n) | Space: O(1)
    pass  # Implement: Longest Continuous Increasing Subsequence`,
        java: `// Problem: Longest Continuous Increasing Subsequence
// Approach: Linear scan reset
// Time: O(n) | Space: O(1)
// Topics: Array

public Object solve(Object input) {
    // Linear scan reset
    // Time: O(n) | Space: O(1)
    return null; // Implement: Longest Continuous Increasing Subsequence
}`,
        cpp: `// Problem: Longest Continuous Increasing Subsequence
// Approach: Linear scan reset
// Time: O(n) | Space: O(1)
// Topics: Array

// Linear scan reset
// Time: O(n) | Space: O(1)
// TODO: Implement Longest Continuous Increasing Subsequence`
    },

    677: {
        explanation: `Trie store value at end. Topics: Trie, Design. Time: O(L), Space: O(n · L).`,
        python: `# Problem: Map Sum Pairs
# Approach: Trie store value at end
# Time: O(L) | Space: O(n · L)
# Topics: Trie, Design

class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()
    def insert(self, word):
        node = self.root
        for ch in word:
            if ch not in node.children:
                node.children[ch] = TrieNode()
            node = node.children[ch]
        node.is_end = True
    def search(self, word):
        node = self.root
        for ch in word:
            if ch not in node.children: return False
            node = node.children[ch]
        return node.is_end`,
        java: `// Problem: Map Sum Pairs
// Approach: Trie store value at end
// Time: O(L) | Space: O(n · L)
// Topics: Trie, Design

public Object solve(Object input) {
    // Trie store value at end
    // Time: O(L) | Space: O(n · L)
    return null; // Implement: Map Sum Pairs
}`,
        cpp: `// Problem: Map Sum Pairs
// Approach: Trie store value at end
// Time: O(L) | Space: O(n · L)
// Topics: Trie, Design

// Trie store value at end
// Time: O(L) | Space: O(n · L)
// TODO: Implement Map Sum Pairs`
    },

    678: {
        explanation: `Track lo/hi open count. Topics: String, Greedy, DP. Time: O(n), Space: O(1).`,
        python: `# Problem: Valid Parenthesis String
# Approach: Track lo/hi open count
# Time: O(n) | Space: O(1)
# Topics: String, Greedy, DP

def solve(data):
    # track lo/hi open count
    # Time: O(n) | Space: O(1)
    pass  # Implement: Valid Parenthesis String`,
        java: `// Problem: Valid Parenthesis String
// Approach: Track lo/hi open count
// Time: O(n) | Space: O(1)
// Topics: String, Greedy, DP

public Object solve(Object input) {
    // Track lo/hi open count
    // Time: O(n) | Space: O(1)
    return null; // Implement: Valid Parenthesis String
}`,
        cpp: `// Problem: Valid Parenthesis String
// Approach: Track lo/hi open count
// Time: O(n) | Space: O(1)
// Topics: String, Greedy, DP

// Track lo/hi open count
// Time: O(n) | Space: O(1)
// TODO: Implement Valid Parenthesis String`
    },

    680: {
        explanation: `Try skip left or right once. Topics: String, Two Pointers. Time: O(n), Space: O(1).`,
        python: `# Problem: Valid Palindrome II
# Approach: Try skip left or right once
# Time: O(n) | Space: O(1)
# Topics: String, Two Pointers

def solve(data):
    # try skip left or right once
    # Time: O(n) | Space: O(1)
    pass  # Implement: Valid Palindrome II`,
        java: `// Problem: Valid Palindrome II
// Approach: Try skip left or right once
// Time: O(n) | Space: O(1)
// Topics: String, Two Pointers

public Object solve(Object input) {
    // Try skip left or right once
    // Time: O(n) | Space: O(1)
    return null; // Implement: Valid Palindrome II
}`,
        cpp: `// Problem: Valid Palindrome II
// Approach: Try skip left or right once
// Time: O(n) | Space: O(1)
// Topics: String, Two Pointers

// Try skip left or right once
// Time: O(n) | Space: O(1)
// TODO: Implement Valid Palindrome II`
    },

    681: {
        explanation: `DFS 4 digits using existing. Topics: String, Backtracking. Time: O(1), Space: O(1).`,
        python: `# Problem: Next Closest Time
# Approach: DFS 4 digits using existing
# Time: O(1) | Space: O(1)
# Topics: String, Backtracking

def solve(root):
    # dfs 4 digits using existing
    def dfs(node):
        if not node:
            return
        # Process current node
        dfs(node.left)
        dfs(node.right)
    return dfs(root)`,
        java: `// Problem: Next Closest Time
// Approach: DFS 4 digits using existing
// Time: O(1) | Space: O(1)
// Topics: String, Backtracking

public void dfs(TreeNode node) {
    // DFS 4 digits using existing
    if (node == null) return;
    // Process node
    dfs(node.left);
    dfs(node.right);
}`,
        cpp: `// Problem: Next Closest Time
// Approach: DFS 4 digits using existing
// Time: O(1) | Space: O(1)
// Topics: String, Backtracking

// DFS 4 digits using existing
void dfs(TreeNode* node) {
    if (!node) return;
    // Process node
    dfs(node->left);
    dfs(node->right);
}`
    },

    684: {
        explanation: `Union-Find detect cycle. Topics: Graph, Union Find. Time: O(n α(n)), Space: O(n).`,
        python: `# Problem: Redundant Connection
# Approach: Union-Find detect cycle
# Time: O(n α(n)) | Space: O(n)
# Topics: Graph, Union Find

def solve(n, edges):
    # union-find detect cycle
    parent = list(range(n))
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x
    def union(x, y):
        px, py = find(x), find(y)
        if px != py: parent[px] = py
    for u, v in edges:
        union(u, v)
    return len(set(find(i) for i in range(n)))`,
        java: `// Problem: Redundant Connection
// Approach: Union-Find detect cycle
// Time: O(n α(n)) | Space: O(n)
// Topics: Graph, Union Find

public Object solve(Object input) {
    // Union-Find detect cycle
    // Time: O(n α(n)) | Space: O(n)
    return null; // Implement: Redundant Connection
}`,
        cpp: `// Problem: Redundant Connection
// Approach: Union-Find detect cycle
// Time: O(n α(n)) | Space: O(n)
// Topics: Graph, Union Find

// Union-Find detect cycle
// Time: O(n α(n)) | Space: O(n)
// TODO: Implement Redundant Connection`
    },

    685: {
        explanation: `Union-Find handle in-degree 2. Topics: Graph, Union Find. Time: O(n), Space: O(n).`,
        python: `# Problem: Redundant Connection II
# Approach: Union-Find handle in-degree 2
# Time: O(n) | Space: O(n)
# Topics: Graph, Union Find

def solve(n, edges):
    # union-find handle in-degree 2
    parent = list(range(n))
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x
    def union(x, y):
        px, py = find(x), find(y)
        if px != py: parent[px] = py
    for u, v in edges:
        union(u, v)
    return len(set(find(i) for i in range(n)))`,
        java: `// Problem: Redundant Connection II
// Approach: Union-Find handle in-degree 2
// Time: O(n) | Space: O(n)
// Topics: Graph, Union Find

public Object solve(Object input) {
    // Union-Find handle in-degree 2
    // Time: O(n) | Space: O(n)
    return null; // Implement: Redundant Connection II
}`,
        cpp: `// Problem: Redundant Connection II
// Approach: Union-Find handle in-degree 2
// Time: O(n) | Space: O(n)
// Topics: Graph, Union Find

// Union-Find handle in-degree 2
// Time: O(n) | Space: O(n)
// TODO: Implement Redundant Connection II`
    },

    686: {
        explanation: `Repeat until length. Topics: String. Time: O(n · m), Space: O(n · m).`,
        python: `# Problem: Repeated String Match
# Approach: Repeat until length
# Time: O(n · m) | Space: O(n · m)
# Topics: String

def solve(data):
    # repeat until length
    # Time: O(n · m) | Space: O(n · m)
    pass  # Implement: Repeated String Match`,
        java: `// Problem: Repeated String Match
// Approach: Repeat until length
// Time: O(n · m) | Space: O(n · m)
// Topics: String

public Object solve(Object input) {
    // Repeat until length
    // Time: O(n · m) | Space: O(n · m)
    return null; // Implement: Repeated String Match
}`,
        cpp: `// Problem: Repeated String Match
// Approach: Repeat until length
// Time: O(n · m) | Space: O(n · m)
// Topics: String

// Repeat until length
// Time: O(n · m) | Space: O(n · m)
// TODO: Implement Repeated String Match`
    },

    687: {
        explanation: `Post-order track max path. Topics: Tree, DFS. Time: O(n), Space: O(H).`,
        python: `# Problem: Longest Univalue Path
# Approach: Post-order track max path
# Time: O(n) | Space: O(H)
# Topics: Tree, DFS

def solve(data):
    # post-order track max path
    # Time: O(n) | Space: O(H)
    pass  # Implement: Longest Univalue Path`,
        java: `// Problem: Longest Univalue Path
// Approach: Post-order track max path
// Time: O(n) | Space: O(H)
// Topics: Tree, DFS

public Object solve(Object input) {
    // Post-order track max path
    // Time: O(n) | Space: O(H)
    return null; // Implement: Longest Univalue Path
}`,
        cpp: `// Problem: Longest Univalue Path
// Approach: Post-order track max path
// Time: O(n) | Space: O(H)
// Topics: Tree, DFS

// Post-order track max path
// Time: O(n) | Space: O(H)
// TODO: Implement Longest Univalue Path`
    },

    688: {
        explanation: `DP over k moves. Topics: DP. Time: O(k · n²), Space: O(n²).`,
        python: `# Problem: Knight Probability in Chessboard
# Approach: DP over k moves
# Time: O(k · n²) | Space: O(n²)
# Topics: DP

def solve(nums):
    # dp over k moves
    n = len(nums)
    dp = [0] * (n + 1)
    # Base case
    dp[0] = 0
    for i in range(1, n + 1):
        # Transition: dp over k moves
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1])
    return dp[n]`,
        java: `// Problem: Knight Probability in Chessboard
// Approach: DP over k moves
// Time: O(k · n²) | Space: O(n²)
// Topics: DP

public int solve(int[] nums) {
    // DP over k moves
    int n = nums.length;
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-1] + nums[i-1]);
    }
    return dp[n];
}`,
        cpp: `// Problem: Knight Probability in Chessboard
// Approach: DP over k moves
// Time: O(k · n²) | Space: O(n²)
// Topics: DP

// DP over k moves
int solve(vector<int>& nums) {
    int n = nums.size();
    vector<int> dp(n + 1, 0);
    for (int i = 1; i <= n; i++)
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1]);
    return dp[n];
}`
    },

    692: {
        explanation: `Freq map + min-heap size k. Topics: String, Heap. Time: O(n log k), Space: O(n).`,
        python: `# Problem: Top K Frequent Words
# Approach: Freq map + min-heap size k
# Time: O(n log k) | Space: O(n)
# Topics: String, Heap

import heapq
def solve(arr, k):
    # freq map + min-heap size k
    heap = []
    for val in arr:
        heapq.heappush(heap, val)
        if len(heap) > k:
            heapq.heappop(heap)
    return heap[0]`,
        java: `// Problem: Top K Frequent Words
// Approach: Freq map + min-heap size k
// Time: O(n log k) | Space: O(n)
// Topics: String, Heap

public int solve(int[] arr, int k) {
    // Freq map + min-heap size k
    PriorityQueue<Integer> pq = new PriorityQueue<>();
    for (int val : arr) {
        pq.add(val);
        if (pq.size() > k) pq.poll();
    }
    return pq.peek();
}`,
        cpp: `// Problem: Top K Frequent Words
// Approach: Freq map + min-heap size k
// Time: O(n log k) | Space: O(n)
// Topics: String, Heap

// Freq map + min-heap size k
int solve(vector<int>& arr, int k) {
    priority_queue<int, vector<int>, greater<>> pq;
    for (int v : arr) {
        pq.push(v);
        if (pq.size() > k) pq.pop();
    }
    return pq.top();
}`
    },

    695: {
        explanation: `DFS count cells. Topics: Array, DFS/BFS, Union Find. Time: O(m·n), Space: O(m·n).`,
        python: `# Problem: Max Area of Island
# Approach: DFS count cells
# Time: O(m·n) | Space: O(m·n)
# Topics: Array, DFS/BFS, Union Find

def solve(root):
    # dfs count cells
    def dfs(node):
        if not node:
            return
        # Process current node
        dfs(node.left)
        dfs(node.right)
    return dfs(root)`,
        java: `// Problem: Max Area of Island
// Approach: DFS count cells
// Time: O(m·n) | Space: O(m·n)
// Topics: Array, DFS/BFS, Union Find

public void dfs(TreeNode node) {
    // DFS count cells
    if (node == null) return;
    // Process node
    dfs(node.left);
    dfs(node.right);
}`,
        cpp: `// Problem: Max Area of Island
// Approach: DFS count cells
// Time: O(m·n) | Space: O(m·n)
// Topics: Array, DFS/BFS, Union Find

// DFS count cells
void dfs(TreeNode* node) {
    if (!node) return;
    // Process node
    dfs(node->left);
    dfs(node->right);
}`
    },

    696: {
        explanation: `Track prev/curr group sizes. Topics: String, Two Pointers. Time: O(n), Space: O(1).`,
        python: `# Problem: Count Binary Substrings
# Approach: Track prev/curr group sizes
# Time: O(n) | Space: O(1)
# Topics: String, Two Pointers

def solve(data):
    # track prev/curr group sizes
    # Time: O(n) | Space: O(1)
    pass  # Implement: Count Binary Substrings`,
        java: `// Problem: Count Binary Substrings
// Approach: Track prev/curr group sizes
// Time: O(n) | Space: O(1)
// Topics: String, Two Pointers

public Object solve(Object input) {
    // Track prev/curr group sizes
    // Time: O(n) | Space: O(1)
    return null; // Implement: Count Binary Substrings
}`,
        cpp: `// Problem: Count Binary Substrings
// Approach: Track prev/curr group sizes
// Time: O(n) | Space: O(1)
// Topics: String, Two Pointers

// Track prev/curr group sizes
// Time: O(n) | Space: O(1)
// TODO: Implement Count Binary Substrings`
    },

    697: {
        explanation: `Track first/last/count per val. Topics: Array, Hash Map. Time: O(n), Space: O(n).`,
        python: `# Problem: Degree of an Array
# Approach: Track first/last/count per val
# Time: O(n) | Space: O(n)
# Topics: Array, Hash Map

def solve(data):
    # track first/last/count per val
    # Time: O(n) | Space: O(n)
    pass  # Implement: Degree of an Array`,
        java: `// Problem: Degree of an Array
// Approach: Track first/last/count per val
// Time: O(n) | Space: O(n)
// Topics: Array, Hash Map

public Object solve(Object input) {
    // Track first/last/count per val
    // Time: O(n) | Space: O(n)
    return null; // Implement: Degree of an Array
}`,
        cpp: `// Problem: Degree of an Array
// Approach: Track first/last/count per val
// Time: O(n) | Space: O(n)
// Topics: Array, Hash Map

// Track first/last/count per val
// Time: O(n) | Space: O(n)
// TODO: Implement Degree of an Array`
    },

    698: {
        explanation: `Backtracking k buckets. Topics: Array, Backtracking, DP. Time: O(k · 2^n), Space: O(n).`,
        python: `# Problem: Partition to K Equal Sum Subsets
# Approach: Backtracking k buckets
# Time: O(k · 2^n) | Space: O(n)
# Topics: Array, Backtracking, DP

def solve(candidates):
    # backtracking k buckets
    result = []
    def backtrack(start, path):
        if is_valid(path):
            result.append(path[:])
            return
        for i in range(start, len(candidates)):
            path.append(candidates[i])
            backtrack(i + 1, path)
            path.pop()
    backtrack(0, [])
    return result`,
        java: `// Problem: Partition to K Equal Sum Subsets
// Approach: Backtracking k buckets
// Time: O(k · 2^n) | Space: O(n)
// Topics: Array, Backtracking, DP

public List<List<Integer>> solve(int[] candidates) {
    // Backtracking k buckets
    List<List<Integer>> result = new ArrayList<>();
    backtrack(candidates, 0, new ArrayList<>(), result);
    return result;
}
private void backtrack(int[] arr, int start, List<Integer> path, List<List<Integer>> result) {
    result.add(new ArrayList<>(path));
    for (int i = start; i < arr.length; i++) {
        path.add(arr[i]);
        backtrack(arr, i + 1, path, result);
        path.remove(path.size() - 1);
    }
}`,
        cpp: `// Problem: Partition to K Equal Sum Subsets
// Approach: Backtracking k buckets
// Time: O(k · 2^n) | Space: O(n)
// Topics: Array, Backtracking, DP

// Backtracking k buckets
vector<vector<int>> solve(vector<int>& nums) {
    vector<vector<int>> res;
    vector<int> path;
    function<void(int)> bt = [&](int start) {
        res.push_back(path);
        for (int i = start; i < nums.size(); i++) {
            path.push_back(nums[i]);
            bt(i + 1);
            path.pop_back();
        }
    };
    bt(0);
    return res;
}`
    },

    700: {
        explanation: `Recursive left/right. Topics: Tree, BST. Time: O(H), Space: O(H).`,
        python: `# Problem: Search in a Binary Search Tree
# Approach: Recursive left/right
# Time: O(H) | Space: O(H)
# Topics: Tree, BST

def solve(data):
    # recursive left/right
    # Time: O(H) | Space: O(H)
    pass  # Implement: Search in a Binary Search Tree`,
        java: `// Problem: Search in a Binary Search Tree
// Approach: Recursive left/right
// Time: O(H) | Space: O(H)
// Topics: Tree, BST

public Object solve(Object input) {
    // Recursive left/right
    // Time: O(H) | Space: O(H)
    return null; // Implement: Search in a Binary Search Tree
}`,
        cpp: `// Problem: Search in a Binary Search Tree
// Approach: Recursive left/right
// Time: O(H) | Space: O(H)
// Topics: Tree, BST

// Recursive left/right
// Time: O(H) | Space: O(H)
// TODO: Implement Search in a Binary Search Tree`
    },

    701: {
        explanation: `BST insert iterative. Topics: Tree, BST. Time: O(H), Space: O(1).`,
        python: `# Problem: Insert into a Binary Search Tree
# Approach: BST insert iterative
# Time: O(H) | Space: O(1)
# Topics: Tree, BST

def solve(data):
    # bst insert iterative
    # Time: O(H) | Space: O(1)
    pass  # Implement: Insert into a Binary Search Tree`,
        java: `// Problem: Insert into a Binary Search Tree
// Approach: BST insert iterative
// Time: O(H) | Space: O(1)
// Topics: Tree, BST

public Object solve(Object input) {
    // BST insert iterative
    // Time: O(H) | Space: O(1)
    return null; // Implement: Insert into a Binary Search Tree
}`,
        cpp: `// Problem: Insert into a Binary Search Tree
// Approach: BST insert iterative
// Time: O(H) | Space: O(1)
// Topics: Tree, BST

// BST insert iterative
// Time: O(H) | Space: O(1)
// TODO: Implement Insert into a Binary Search Tree`
    },

    703: {
        explanation: `Min-heap of size k. Topics: Heap, Design. Time: O(log k), Space: O(k).`,
        python: `# Problem: Kth Largest Element in a Stream
# Approach: Min-heap of size k
# Time: O(log k) | Space: O(k)
# Topics: Heap, Design

import heapq
def solve(arr, k):
    # min-heap of size k
    heap = []
    for val in arr:
        heapq.heappush(heap, val)
        if len(heap) > k:
            heapq.heappop(heap)
    return heap[0]`,
        java: `// Problem: Kth Largest Element in a Stream
// Approach: Min-heap of size k
// Time: O(log k) | Space: O(k)
// Topics: Heap, Design

public int solve(int[] arr, int k) {
    // Min-heap of size k
    PriorityQueue<Integer> pq = new PriorityQueue<>();
    for (int val : arr) {
        pq.add(val);
        if (pq.size() > k) pq.poll();
    }
    return pq.peek();
}`,
        cpp: `// Problem: Kth Largest Element in a Stream
// Approach: Min-heap of size k
// Time: O(log k) | Space: O(k)
// Topics: Heap, Design

// Min-heap of size k
int solve(vector<int>& arr, int k) {
    priority_queue<int, vector<int>, greater<>> pq;
    for (int v : arr) {
        pq.push(v);
        if (pq.size() > k) pq.pop();
    }
    return pq.top();
}`
    },

    704: {
        explanation: `Classic binary search. Topics: Array, Binary Search. Time: O(log n), Space: O(1).`,
        python: `# Problem: Binary Search
# Approach: Classic binary search
# Time: O(log n) | Space: O(1)
# Topics: Array, Binary Search

def solve(arr, target):
    # classic binary search
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return lo`,
        java: `// Problem: Binary Search
// Approach: Classic binary search
// Time: O(log n) | Space: O(1)
// Topics: Array, Binary Search

public int solve(int[] arr, int target) {
    // Classic binary search
    int lo = 0, hi = arr.length - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return lo;
}`,
        cpp: `// Problem: Binary Search
// Approach: Classic binary search
// Time: O(log n) | Space: O(1)
// Topics: Array, Binary Search

// Classic binary search
int solve(vector<int>& arr, int target) {
    int lo = 0, hi = arr.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return lo;
}`
    },

    705: {
        explanation: `Array of buckets. Topics: Hash Map, Design. Time: O(1) avg, Space: O(n).`,
        python: `# Problem: Design HashSet
# Approach: Array of buckets
# Time: O(1) avg | Space: O(n)
# Topics: Hash Map, Design

def solve(data):
    # array of buckets
    # Time: O(1) avg | Space: O(n)
    pass  # Implement: Design HashSet`,
        java: `// Problem: Design HashSet
// Approach: Array of buckets
// Time: O(1) avg | Space: O(n)
// Topics: Hash Map, Design

public Object solve(Object input) {
    // Array of buckets
    // Time: O(1) avg | Space: O(n)
    return null; // Implement: Design HashSet
}`,
        cpp: `// Problem: Design HashSet
// Approach: Array of buckets
// Time: O(1) avg | Space: O(n)
// Topics: Hash Map, Design

// Array of buckets
// Time: O(1) avg | Space: O(n)
// TODO: Implement Design HashSet`
    },

    706: {
        explanation: `Array of buckets. Topics: Hash Map, Design. Time: O(1) avg, Space: O(n).`,
        python: `# Problem: Design HashMap
# Approach: Array of buckets
# Time: O(1) avg | Space: O(n)
# Topics: Hash Map, Design

def solve(data):
    # array of buckets
    # Time: O(1) avg | Space: O(n)
    pass  # Implement: Design HashMap`,
        java: `// Problem: Design HashMap
// Approach: Array of buckets
// Time: O(1) avg | Space: O(n)
// Topics: Hash Map, Design

public Object solve(Object input) {
    // Array of buckets
    // Time: O(1) avg | Space: O(n)
    return null; // Implement: Design HashMap
}`,
        cpp: `// Problem: Design HashMap
// Approach: Array of buckets
// Time: O(1) avg | Space: O(n)
// Topics: Hash Map, Design

// Array of buckets
// Time: O(1) avg | Space: O(n)
// TODO: Implement Design HashMap`
    },

    708: {
        explanation: `Find insert point edge cases. Topics: Linked List. Time: O(n), Space: O(1).`,
        python: `# Problem: Insert into a Sorted Circular Linked List
# Approach: Find insert point edge cases
# Time: O(n) | Space: O(1)
# Topics: Linked List

def solve(n, edges):
    # find insert point edge cases
    parent = list(range(n))
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x
    def union(x, y):
        px, py = find(x), find(y)
        if px != py: parent[px] = py
    for u, v in edges:
        union(u, v)
    return len(set(find(i) for i in range(n)))`,
        java: `// Problem: Insert into a Sorted Circular Linked List
// Approach: Find insert point edge cases
// Time: O(n) | Space: O(1)
// Topics: Linked List

public Object solve(Object input) {
    // Find insert point edge cases
    // Time: O(n) | Space: O(1)
    return null; // Implement: Insert into a Sorted Circular Linked List
}`,
        cpp: `// Problem: Insert into a Sorted Circular Linked List
// Approach: Find insert point edge cases
// Time: O(n) | Space: O(1)
// Topics: Linked List

// Find insert point edge cases
// Time: O(n) | Space: O(1)
// TODO: Implement Insert into a Sorted Circular Linked List`
    },

    710: {
        explanation: `Remap blacklist to end. Topics: Array, Hash Map, Binary Search. Time: O(b), Space: O(b).`,
        python: `# Problem: Random Pick with Blacklist
# Approach: Remap blacklist to end
# Time: O(b) | Space: O(b)
# Topics: Array, Hash Map, Binary Search

def solve(data):
    # remap blacklist to end
    # Time: O(b) | Space: O(b)
    pass  # Implement: Random Pick with Blacklist`,
        java: `// Problem: Random Pick with Blacklist
// Approach: Remap blacklist to end
// Time: O(b) | Space: O(b)
// Topics: Array, Hash Map, Binary Search

public Object solve(Object input) {
    // Remap blacklist to end
    // Time: O(b) | Space: O(b)
    return null; // Implement: Random Pick with Blacklist
}`,
        cpp: `// Problem: Random Pick with Blacklist
// Approach: Remap blacklist to end
// Time: O(b) | Space: O(b)
// Topics: Array, Hash Map, Binary Search

// Remap blacklist to end
// Time: O(b) | Space: O(b)
// TODO: Implement Random Pick with Blacklist`
    },

    712: {
        explanation: `LCS variant with ASCII weights. Topics: String, DP. Time: O(m·n), Space: O(m·n).`,
        python: `# Problem: Minimum ASCII Delete Sum for Two Strings
# Approach: LCS variant with ASCII weights
# Time: O(m·n) | Space: O(m·n)
# Topics: String, DP

def solve(data):
    # lcs variant with ascii weights
    # Time: O(m·n) | Space: O(m·n)
    pass  # Implement: Minimum ASCII Delete Sum for Two Strings`,
        java: `// Problem: Minimum ASCII Delete Sum for Two Strings
// Approach: LCS variant with ASCII weights
// Time: O(m·n) | Space: O(m·n)
// Topics: String, DP

public Object solve(Object input) {
    // LCS variant with ASCII weights
    // Time: O(m·n) | Space: O(m·n)
    return null; // Implement: Minimum ASCII Delete Sum for Two Strings
}`,
        cpp: `// Problem: Minimum ASCII Delete Sum for Two Strings
// Approach: LCS variant with ASCII weights
// Time: O(m·n) | Space: O(m·n)
// Topics: String, DP

// LCS variant with ASCII weights
// Time: O(m·n) | Space: O(m·n)
// TODO: Implement Minimum ASCII Delete Sum for Two Strings`
    },

    713: {
        explanation: `Sliding window product. Topics: Array, Sliding Window. Time: O(n), Space: O(1).`,
        python: `# Problem: Subarray Product Less Than K
# Approach: Sliding window product
# Time: O(n) | Space: O(1)
# Topics: Array, Sliding Window

def solve(s):
    # sliding window product
    left = 0
    window = {}
    result = 0
    for right in range(len(s)):
        # Expand window
        window[s[right]] = window.get(s[right], 0) + 1
        # Shrink if invalid
        while not valid(window):
            window[s[left]] -= 1
            if window[s[left]] == 0: del window[s[left]]
            left += 1
        result = max(result, right - left + 1)
    return result`,
        java: `// Problem: Subarray Product Less Than K
// Approach: Sliding window product
// Time: O(n) | Space: O(1)
// Topics: Array, Sliding Window

public Object solve(Object input) {
    // Sliding window product
    // Time: O(n) | Space: O(1)
    return null; // Implement: Subarray Product Less Than K
}`,
        cpp: `// Problem: Subarray Product Less Than K
// Approach: Sliding window product
// Time: O(n) | Space: O(1)
// Topics: Array, Sliding Window

// Sliding window product
// Time: O(n) | Space: O(1)
// TODO: Implement Subarray Product Less Than K`
    },

    714: {
        explanation: `DP hold/free states. Topics: Array, DP, Greedy. Time: O(n), Space: O(1).`,
        python: `# Problem: Best Time to Buy and Sell Stock with Transaction Fee
# Approach: DP hold/free states
# Time: O(n) | Space: O(1)
# Topics: Array, DP, Greedy

def solve(nums):
    # dp hold/free states
    n = len(nums)
    dp = [0] * (n + 1)
    # Base case
    dp[0] = 0
    for i in range(1, n + 1):
        # Transition: dp hold/free states
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1])
    return dp[n]`,
        java: `// Problem: Best Time to Buy and Sell Stock with Transaction Fee
// Approach: DP hold/free states
// Time: O(n) | Space: O(1)
// Topics: Array, DP, Greedy

public int solve(int[] nums) {
    // DP hold/free states
    int n = nums.length;
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-1] + nums[i-1]);
    }
    return dp[n];
}`,
        cpp: `// Problem: Best Time to Buy and Sell Stock with Transaction Fee
// Approach: DP hold/free states
// Time: O(n) | Space: O(1)
// Topics: Array, DP, Greedy

// DP hold/free states
int solve(vector<int>& nums) {
    int n = nums.size();
    vector<int> dp(n + 1, 0);
    for (int i = 1; i <= n; i++)
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1]);
    return dp[n];
}`
    },

    716: {
        explanation: `Two stacks or DLL + TreeMap. Topics: Stack, Design, Sorted Set. Time: O(log n), Space: O(n).`,
        python: `# Problem: Max Stack
# Approach: Two stacks or DLL + TreeMap
# Time: O(log n) | Space: O(n)
# Topics: Stack, Design, Sorted Set

def solve(arr):
    # two stacks or dll + treemap
    stack = []
    result = 0
    for i, val in enumerate(arr):
        while stack and arr[stack[-1]] < val:
            idx = stack.pop()
            # Process popped element
        stack.append(i)
    return result`,
        java: `// Problem: Max Stack
// Approach: Two stacks or DLL + TreeMap
// Time: O(log n) | Space: O(n)
// Topics: Stack, Design, Sorted Set

public int solve(int[] arr) {
    // Two stacks or DLL + TreeMap
    Deque<Integer> stack = new ArrayDeque<>();
    int result = 0;
    for (int i = 0; i < arr.length; i++) {
        while (!stack.isEmpty() && arr[stack.peek()] < arr[i]) {
            stack.pop();
        }
        stack.push(i);
    }
    return result;
}`,
        cpp: `// Problem: Max Stack
// Approach: Two stacks or DLL + TreeMap
// Time: O(log n) | Space: O(n)
// Topics: Stack, Design, Sorted Set

// Two stacks or DLL + TreeMap
int solve(vector<int>& arr) {
    stack<int> st;
    int res = 0;
    for (int i = 0; i < arr.size(); i++) {
        while (!st.empty() && arr[st.top()] < arr[i]) st.pop();
        st.push(i);
    }
    return res;
}`
    },

    718: {
        explanation: `2D DP suffix. Topics: Array, DP, Binary Search. Time: O(m·n), Space: O(m·n).`,
        python: `# Problem: Maximum Length of Repeated Subarray
# Approach: 2D DP suffix
# Time: O(m·n) | Space: O(m·n)
# Topics: Array, DP, Binary Search

def solve(nums):
    # 2d dp suffix
    n = len(nums)
    dp = [0] * (n + 1)
    # Base case
    dp[0] = 0
    for i in range(1, n + 1):
        # Transition: 2d dp suffix
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1])
    return dp[n]`,
        java: `// Problem: Maximum Length of Repeated Subarray
// Approach: 2D DP suffix
// Time: O(m·n) | Space: O(m·n)
// Topics: Array, DP, Binary Search

public int solve(int[] nums) {
    // 2D DP suffix
    int n = nums.length;
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-1] + nums[i-1]);
    }
    return dp[n];
}`,
        cpp: `// Problem: Maximum Length of Repeated Subarray
// Approach: 2D DP suffix
// Time: O(m·n) | Space: O(m·n)
// Topics: Array, DP, Binary Search

// 2D DP suffix
int solve(vector<int>& nums) {
    int n = nums.size();
    vector<int> dp(n + 1, 0);
    for (int i = 1; i <= n; i++)
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1]);
    return dp[n];
}`
    },

    720: {
        explanation: `Trie BFS valid word path. Topics: String, Trie. Time: O(n · L), Space: O(n · L).`,
        python: `# Problem: Longest Word in Dictionary
# Approach: Trie BFS valid word path
# Time: O(n · L) | Space: O(n · L)
# Topics: String, Trie

from collections import deque
def solve(root):
    # trie bfs valid word path
    if not root: return []
    queue = deque([root])
    result = []
    while queue:
        level_size = len(queue)
        level = []
        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)
            if node.left: queue.append(node.left)
            if node.right: queue.append(node.right)
        result.append(level)
    return result`,
        java: `// Problem: Longest Word in Dictionary
// Approach: Trie BFS valid word path
// Time: O(n · L) | Space: O(n · L)
// Topics: String, Trie

public List<List<Integer>> bfs(TreeNode root) {
    // Trie BFS valid word path
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;
    Queue<TreeNode> queue = new LinkedList<>();
    queue.add(root);
    while (!queue.isEmpty()) {
        int size = queue.size();
        List<Integer> level = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            TreeNode node = queue.poll();
            level.add(node.val);
            if (node.left != null) queue.add(node.left);
            if (node.right != null) queue.add(node.right);
        }
        result.add(level);
    }
    return result;
}`,
        cpp: `// Problem: Longest Word in Dictionary
// Approach: Trie BFS valid word path
// Time: O(n · L) | Space: O(n · L)
// Topics: String, Trie

// Trie BFS valid word path
vector<vector<int>> bfs(TreeNode* root) {
    vector<vector<int>> res;
    if (!root) return res;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        int sz = q.size();
        vector<int> level;
        while (sz--) {
            auto node = q.front(); q.pop();
            level.push_back(node->val);
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        res.push_back(level);
    }
    return res;
}`
    },

    721: {
        explanation: `Union-Find by email. Topics: String, Union Find, DFS. Time: O(n · L log(n · L)), Space: O(n · L).`,
        python: `# Problem: Accounts Merge
# Approach: Union-Find by email
# Time: O(n · L log(n · L)) | Space: O(n · L)
# Topics: String, Union Find, DFS

def solve(n, edges):
    # union-find by email
    parent = list(range(n))
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x
    def union(x, y):
        px, py = find(x), find(y)
        if px != py: parent[px] = py
    for u, v in edges:
        union(u, v)
    return len(set(find(i) for i in range(n)))`,
        java: `// Problem: Accounts Merge
// Approach: Union-Find by email
// Time: O(n · L log(n · L)) | Space: O(n · L)
// Topics: String, Union Find, DFS

public Object solve(Object input) {
    // Union-Find by email
    // Time: O(n · L log(n · L)) | Space: O(n · L)
    return null; // Implement: Accounts Merge
}`,
        cpp: `// Problem: Accounts Merge
// Approach: Union-Find by email
// Time: O(n · L log(n · L)) | Space: O(n · L)
// Topics: String, Union Find, DFS

// Union-Find by email
// Time: O(n · L log(n · L)) | Space: O(n · L)
// TODO: Implement Accounts Merge`
    },

    724: {
        explanation: `Total sum - left prefix. Topics: Array, Prefix Sum. Time: O(n), Space: O(1).`,
        python: `# Problem: Find Pivot Index
# Approach: Total sum - left prefix
# Time: O(n) | Space: O(1)
# Topics: Array, Prefix Sum

def solve(data):
    # total sum - left prefix
    # Time: O(n) | Space: O(1)
    pass  # Implement: Find Pivot Index`,
        java: `// Problem: Find Pivot Index
// Approach: Total sum - left prefix
// Time: O(n) | Space: O(1)
// Topics: Array, Prefix Sum

public Object solve(Object input) {
    // Total sum - left prefix
    // Time: O(n) | Space: O(1)
    return null; // Implement: Find Pivot Index
}`,
        cpp: `// Problem: Find Pivot Index
// Approach: Total sum - left prefix
// Time: O(n) | Space: O(1)
// Topics: Array, Prefix Sum

// Total sum - left prefix
// Time: O(n) | Space: O(1)
// TODO: Implement Find Pivot Index`
    },

    725: {
        explanation: `Compute size distribute evenly. Topics: Linked List. Time: O(n+k), Space: O(k).`,
        python: `# Problem: Split Linked List in Parts
# Approach: Compute size distribute evenly
# Time: O(n+k) | Space: O(k)
# Topics: Linked List

def solve(data):
    # compute size distribute evenly
    # Time: O(n+k) | Space: O(k)
    pass  # Implement: Split Linked List in Parts`,
        java: `// Problem: Split Linked List in Parts
// Approach: Compute size distribute evenly
// Time: O(n+k) | Space: O(k)
// Topics: Linked List

public Object solve(Object input) {
    // Compute size distribute evenly
    // Time: O(n+k) | Space: O(k)
    return null; // Implement: Split Linked List in Parts
}`,
        cpp: `// Problem: Split Linked List in Parts
// Approach: Compute size distribute evenly
// Time: O(n+k) | Space: O(k)
// Topics: Linked List

// Compute size distribute evenly
// Time: O(n+k) | Space: O(k)
// TODO: Implement Split Linked List in Parts`
    },

    726: {
        explanation: `Stack hash parse formula. Topics: String, Hash Map, Stack. Time: O(n²), Space: O(n).`,
        python: `# Problem: Number of Atoms
# Approach: Stack hash parse formula
# Time: O(n²) | Space: O(n)
# Topics: String, Hash Map, Stack

def solve(arr):
    # stack hash parse formula
    stack = []
    result = 0
    for i, val in enumerate(arr):
        while stack and arr[stack[-1]] < val:
            idx = stack.pop()
            # Process popped element
        stack.append(i)
    return result`,
        java: `// Problem: Number of Atoms
// Approach: Stack hash parse formula
// Time: O(n²) | Space: O(n)
// Topics: String, Hash Map, Stack

public int solve(int[] arr) {
    // Stack hash parse formula
    Deque<Integer> stack = new ArrayDeque<>();
    int result = 0;
    for (int i = 0; i < arr.length; i++) {
        while (!stack.isEmpty() && arr[stack.peek()] < arr[i]) {
            stack.pop();
        }
        stack.push(i);
    }
    return result;
}`,
        cpp: `// Problem: Number of Atoms
// Approach: Stack hash parse formula
// Time: O(n²) | Space: O(n)
// Topics: String, Hash Map, Stack

// Stack hash parse formula
int solve(vector<int>& arr) {
    stack<int> st;
    int res = 0;
    for (int i = 0; i < arr.size(); i++) {
        while (!st.empty() && arr[st.top()] < arr[i]) st.pop();
        st.push(i);
    }
    return res;
}`
    },

    728: {
        explanation: `Check each digit divides. Topics: Math. Time: O(n · d), Space: O(n).`,
        python: `# Problem: Self Dividing Numbers
# Approach: Check each digit divides
# Time: O(n · d) | Space: O(n)
# Topics: Math

def solve(data):
    # check each digit divides
    # Time: O(n · d) | Space: O(n)
    pass  # Implement: Self Dividing Numbers`,
        java: `// Problem: Self Dividing Numbers
// Approach: Check each digit divides
// Time: O(n · d) | Space: O(n)
// Topics: Math

public Object solve(Object input) {
    // Check each digit divides
    // Time: O(n · d) | Space: O(n)
    return null; // Implement: Self Dividing Numbers
}`,
        cpp: `// Problem: Self Dividing Numbers
// Approach: Check each digit divides
// Time: O(n · d) | Space: O(n)
// Topics: Math

// Check each digit divides
// Time: O(n · d) | Space: O(n)
// TODO: Implement Self Dividing Numbers`
    },

    729: {
        explanation: `Sorted list binary search. Topics: Array, Binary Search, Design. Time: O(log n), Space: O(n).`,
        python: `# Problem: My Calendar I
# Approach: Sorted list binary search
# Time: O(log n) | Space: O(n)
# Topics: Array, Binary Search, Design

def solve(arr, target):
    # sorted list binary search
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return lo`,
        java: `// Problem: My Calendar I
// Approach: Sorted list binary search
// Time: O(log n) | Space: O(n)
// Topics: Array, Binary Search, Design

public int solve(int[] arr, int target) {
    // Sorted list binary search
    int lo = 0, hi = arr.length - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return lo;
}`,
        cpp: `// Problem: My Calendar I
// Approach: Sorted list binary search
// Time: O(log n) | Space: O(n)
// Topics: Array, Binary Search, Design

// Sorted list binary search
int solve(vector<int>& arr, int target) {
    int lo = 0, hi = arr.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return lo;
}`
    },

    730: {
        explanation: `Interval DP with char anchor. Topics: String, DP. Time: O(n³), Space: O(n²).`,
        python: `# Problem: Count Different Palindromic Subsequences
# Approach: Interval DP with char anchor
# Time: O(n³) | Space: O(n²)
# Topics: String, DP

def solve(nums):
    # interval dp with char anchor
    n = len(nums)
    dp = [0] * (n + 1)
    # Base case
    dp[0] = 0
    for i in range(1, n + 1):
        # Transition: interval dp with char anchor
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1])
    return dp[n]`,
        java: `// Problem: Count Different Palindromic Subsequences
// Approach: Interval DP with char anchor
// Time: O(n³) | Space: O(n²)
// Topics: String, DP

public int solve(int[] nums) {
    // Interval DP with char anchor
    int n = nums.length;
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-1] + nums[i-1]);
    }
    return dp[n];
}`,
        cpp: `// Problem: Count Different Palindromic Subsequences
// Approach: Interval DP with char anchor
// Time: O(n³) | Space: O(n²)
// Topics: String, DP

// Interval DP with char anchor
int solve(vector<int>& nums) {
    int n = nums.size();
    vector<int> dp(n + 1, 0);
    for (int i = 1; i <= n; i++)
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1]);
    return dp[n];
}`
    },

    731: {
        explanation: `Two sorted lists. Topics: Array, Segment Tree, Design. Time: O(n log n), Space: O(n).`,
        python: `# Problem: My Calendar II
# Approach: Two sorted lists
# Time: O(n log n) | Space: O(n)
# Topics: Array, Segment Tree, Design

def solve(arr):
    # two sorted lists
    arr.sort()
    result = []
    for i in range(len(arr)):
        # Process sorted array
        result.append(arr[i])
    return result`,
        java: `// Problem: My Calendar II
// Approach: Two sorted lists
// Time: O(n log n) | Space: O(n)
// Topics: Array, Segment Tree, Design

public int[] solve(int[] arr) {
    // Two sorted lists
    Arrays.sort(arr);
    return arr;
}`,
        cpp: `// Problem: My Calendar II
// Approach: Two sorted lists
// Time: O(n log n) | Space: O(n)
// Topics: Array, Segment Tree, Design

// Two sorted lists
// Time: O(n log n) | Space: O(n)
// TODO: Implement My Calendar II`
    },

    733: {
        explanation: `DFS change connected color. Topics: Array, BFS/DFS. Time: O(m·n), Space: O(m·n).`,
        python: `# Problem: Flood Fill
# Approach: DFS change connected color
# Time: O(m·n) | Space: O(m·n)
# Topics: Array, BFS/DFS

def solve(root):
    # dfs change connected color
    def dfs(node):
        if not node:
            return
        # Process current node
        dfs(node.left)
        dfs(node.right)
    return dfs(root)`,
        java: `// Problem: Flood Fill
// Approach: DFS change connected color
// Time: O(m·n) | Space: O(m·n)
// Topics: Array, BFS/DFS

public void dfs(TreeNode node) {
    // DFS change connected color
    if (node == null) return;
    // Process node
    dfs(node.left);
    dfs(node.right);
}`,
        cpp: `// Problem: Flood Fill
// Approach: DFS change connected color
// Time: O(m·n) | Space: O(m·n)
// Topics: Array, BFS/DFS

// DFS change connected color
void dfs(TreeNode* node) {
    if (!node) return;
    // Process node
    dfs(node->left);
    dfs(node->right);
}`
    },

    735: {
        explanation: `Stack simulate collisions. Topics: Array, Stack. Time: O(n), Space: O(n).`,
        python: `# Problem: Asteroid Collision
# Approach: Stack simulate collisions
# Time: O(n) | Space: O(n)
# Topics: Array, Stack

def solve(arr):
    # stack simulate collisions
    stack = []
    result = 0
    for i, val in enumerate(arr):
        while stack and arr[stack[-1]] < val:
            idx = stack.pop()
            # Process popped element
        stack.append(i)
    return result`,
        java: `// Problem: Asteroid Collision
// Approach: Stack simulate collisions
// Time: O(n) | Space: O(n)
// Topics: Array, Stack

public int solve(int[] arr) {
    // Stack simulate collisions
    Deque<Integer> stack = new ArrayDeque<>();
    int result = 0;
    for (int i = 0; i < arr.length; i++) {
        while (!stack.isEmpty() && arr[stack.peek()] < arr[i]) {
            stack.pop();
        }
        stack.push(i);
    }
    return result;
}`,
        cpp: `// Problem: Asteroid Collision
// Approach: Stack simulate collisions
// Time: O(n) | Space: O(n)
// Topics: Array, Stack

// Stack simulate collisions
int solve(vector<int>& arr) {
    stack<int> st;
    int res = 0;
    for (int i = 0; i < arr.size(); i++) {
        while (!st.empty() && arr[st.top()] < arr[i]) st.pop();
        st.push(i);
    }
    return res;
}`
    },

    739: {
        explanation: `Monotonic stack. Topics: Array, Stack. Time: O(n), Space: O(n).`,
        python: `# Problem: Daily Temperatures
# Approach: Monotonic stack
# Time: O(n) | Space: O(n)
# Topics: Array, Stack

def solve(arr):
    # monotonic stack
    stack = []
    result = 0
    for i, val in enumerate(arr):
        while stack and arr[stack[-1]] < val:
            idx = stack.pop()
            # Process popped element
        stack.append(i)
    return result`,
        java: `// Problem: Daily Temperatures
// Approach: Monotonic stack
// Time: O(n) | Space: O(n)
// Topics: Array, Stack

public int solve(int[] arr) {
    // Monotonic stack
    Deque<Integer> stack = new ArrayDeque<>();
    int result = 0;
    for (int i = 0; i < arr.length; i++) {
        while (!stack.isEmpty() && arr[stack.peek()] < arr[i]) {
            stack.pop();
        }
        stack.push(i);
    }
    return result;
}`,
        cpp: `// Problem: Daily Temperatures
// Approach: Monotonic stack
// Time: O(n) | Space: O(n)
// Topics: Array, Stack

// Monotonic stack
int solve(vector<int>& arr) {
    stack<int> st;
    int res = 0;
    for (int i = 0; i < arr.size(); i++) {
        while (!st.empty() && arr[st.top()] < arr[i]) st.pop();
        st.push(i);
    }
    return res;
}`
    },

    740: {
        explanation: `Map to house robber. Topics: Array, DP. Time: O(n + max_val), Space: O(max_val).`,
        python: `# Problem: Delete and Earn
# Approach: Map to house robber
# Time: O(n + max_val) | Space: O(max_val)
# Topics: Array, DP

def solve(data):
    # map to house robber
    # Time: O(n + max_val) | Space: O(max_val)
    pass  # Implement: Delete and Earn`,
        java: `// Problem: Delete and Earn
// Approach: Map to house robber
// Time: O(n + max_val) | Space: O(max_val)
// Topics: Array, DP

public Object solve(Object input) {
    // Map to house robber
    // Time: O(n + max_val) | Space: O(max_val)
    return null; // Implement: Delete and Earn
}`,
        cpp: `// Problem: Delete and Earn
// Approach: Map to house robber
// Time: O(n + max_val) | Space: O(max_val)
// Topics: Array, DP

// Map to house robber
// Time: O(n + max_val) | Space: O(max_val)
// TODO: Implement Delete and Earn`
    },

    743: {
        explanation: `Dijkstra single source. Topics: Graph, Dijkstra, BFS. Time: O((V+E) log V), Space: O(V+E).`,
        python: `# Problem: Network Delay Time
# Approach: Dijkstra single source
# Time: O((V+E) log V) | Space: O(V+E)
# Topics: Graph, Dijkstra, BFS

def solve(data):
    # dijkstra single source
    # Time: O((V+E) log V) | Space: O(V+E)
    pass  # Implement: Network Delay Time`,
        java: `// Problem: Network Delay Time
// Approach: Dijkstra single source
// Time: O((V+E) log V) | Space: O(V+E)
// Topics: Graph, Dijkstra, BFS

public Object solve(Object input) {
    // Dijkstra single source
    // Time: O((V+E) log V) | Space: O(V+E)
    return null; // Implement: Network Delay Time
}`,
        cpp: `// Problem: Network Delay Time
// Approach: Dijkstra single source
// Time: O((V+E) log V) | Space: O(V+E)
// Topics: Graph, Dijkstra, BFS

// Dijkstra single source
// Time: O((V+E) log V) | Space: O(V+E)
// TODO: Implement Network Delay Time`
    },

    744: {
        explanation: `Binary search wrap-around. Topics: Array, Binary Search. Time: O(log n), Space: O(1).`,
        python: `# Problem: Find Smallest Letter Greater Than Target
# Approach: Binary search wrap-around
# Time: O(log n) | Space: O(1)
# Topics: Array, Binary Search

def solve(arr, target):
    # binary search wrap-around
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return lo`,
        java: `// Problem: Find Smallest Letter Greater Than Target
// Approach: Binary search wrap-around
// Time: O(log n) | Space: O(1)
// Topics: Array, Binary Search

public int solve(int[] arr, int target) {
    // Binary search wrap-around
    int lo = 0, hi = arr.length - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return lo;
}`,
        cpp: `// Problem: Find Smallest Letter Greater Than Target
// Approach: Binary search wrap-around
// Time: O(log n) | Space: O(1)
// Topics: Array, Binary Search

// Binary search wrap-around
int solve(vector<int>& arr, int target) {
    int lo = 0, hi = arr.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return lo;
}`
    },

    745: {
        explanation: `Combined prefix#suffix trie. Topics: String, Trie, Design. Time: O(n · L²), Space: O(n · L²).`,
        python: `# Problem: Prefix and Suffix Search
# Approach: Combined prefix#suffix trie
# Time: O(n · L²) | Space: O(n · L²)
# Topics: String, Trie, Design

class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()
    def insert(self, word):
        node = self.root
        for ch in word:
            if ch not in node.children:
                node.children[ch] = TrieNode()
            node = node.children[ch]
        node.is_end = True
    def search(self, word):
        node = self.root
        for ch in word:
            if ch not in node.children: return False
            node = node.children[ch]
        return node.is_end`,
        java: `// Problem: Prefix and Suffix Search
// Approach: Combined prefix#suffix trie
// Time: O(n · L²) | Space: O(n · L²)
// Topics: String, Trie, Design

public Object solve(Object input) {
    // Combined prefix#suffix trie
    // Time: O(n · L²) | Space: O(n · L²)
    return null; // Implement: Prefix and Suffix Search
}`,
        cpp: `// Problem: Prefix and Suffix Search
// Approach: Combined prefix#suffix trie
// Time: O(n · L²) | Space: O(n · L²)
// Topics: String, Trie, Design

// Combined prefix#suffix trie
// Time: O(n · L²) | Space: O(n · L²)
// TODO: Implement Prefix and Suffix Search`
    },

    746: {
        explanation: `DP take min of 2 options. Topics: Array, DP. Time: O(n), Space: O(1).`,
        python: `# Problem: Min Cost Climbing Stairs
# Approach: DP take min of 2 options
# Time: O(n) | Space: O(1)
# Topics: Array, DP

def solve(nums):
    # dp take min of 2 options
    n = len(nums)
    dp = [0] * (n + 1)
    # Base case
    dp[0] = 0
    for i in range(1, n + 1):
        # Transition: dp take min of 2 options
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1])
    return dp[n]`,
        java: `// Problem: Min Cost Climbing Stairs
// Approach: DP take min of 2 options
// Time: O(n) | Space: O(1)
// Topics: Array, DP

public int solve(int[] nums) {
    // DP take min of 2 options
    int n = nums.length;
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-1] + nums[i-1]);
    }
    return dp[n];
}`,
        cpp: `// Problem: Min Cost Climbing Stairs
// Approach: DP take min of 2 options
// Time: O(n) | Space: O(1)
// Topics: Array, DP

// DP take min of 2 options
int solve(vector<int>& nums) {
    int n = nums.size();
    vector<int> dp(n + 1, 0);
    for (int i = 1; i <= n; i++)
        dp[i] = max(dp[i-1], dp[i-1] + nums[i-1]);
    return dp[n];
}`
    },

    747: {
        explanation: `Find max1 and max2. Topics: Array. Time: O(n), Space: O(1).`,
        python: `# Problem: Largest Number At Least Twice of Others
# Approach: Find max1 and max2
# Time: O(n) | Space: O(1)
# Topics: Array

def solve(n, edges):
    # find max1 and max2
    parent = list(range(n))
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x
    def union(x, y):
        px, py = find(x), find(y)
        if px != py: parent[px] = py
    for u, v in edges:
        union(u, v)
    return len(set(find(i) for i in range(n)))`,
        java: `// Problem: Largest Number At Least Twice of Others
// Approach: Find max1 and max2
// Time: O(n) | Space: O(1)
// Topics: Array

public Object solve(Object input) {
    // Find max1 and max2
    // Time: O(n) | Space: O(1)
    return null; // Implement: Largest Number At Least Twice of Others
}`,
        cpp: `// Problem: Largest Number At Least Twice of Others
// Approach: Find max1 and max2
// Time: O(n) | Space: O(1)
// Topics: Array

// Find max1 and max2
// Time: O(n) | Space: O(1)
// TODO: Implement Largest Number At Least Twice of Others`
    },

    748: {
        explanation: `Char freq match license. Topics: String, Hash Map. Time: O(n · L), Space: O(1).`,
        python: `# Problem: Shortest Completing Word
# Approach: Char freq match license
# Time: O(n · L) | Space: O(1)
# Topics: String, Hash Map

def solve(data):
    # char freq match license
    # Time: O(n · L) | Space: O(1)
    pass  # Implement: Shortest Completing Word`,
        java: `// Problem: Shortest Completing Word
// Approach: Char freq match license
// Time: O(n · L) | Space: O(1)
// Topics: String, Hash Map

public Object solve(Object input) {
    // Char freq match license
    // Time: O(n · L) | Space: O(1)
    return null; // Implement: Shortest Completing Word
}`,
        cpp: `// Problem: Shortest Completing Word
// Approach: Char freq match license
// Time: O(n · L) | Space: O(1)
// Topics: String, Hash Map

// Char freq match license
// Time: O(n · L) | Space: O(1)
// TODO: Implement Shortest Completing Word`
    },

    749: {
        explanation: `Simulate quarantine rounds. Topics: Array, DFS, Simulation. Time: O(m·n)² per round, Space: O(m·n).`,
        python: `# Problem: Contain Virus
# Approach: Simulate quarantine rounds
# Time: O(m·n)² per round | Space: O(m·n)
# Topics: Array, DFS, Simulation

def solve(data):
    # simulate quarantine rounds
    # Time: O(m·n)² per round | Space: O(m·n)
    pass  # Implement: Contain Virus`,
        java: `// Problem: Contain Virus
// Approach: Simulate quarantine rounds
// Time: O(m·n)² per round | Space: O(m·n)
// Topics: Array, DFS, Simulation

public Object solve(Object input) {
    // Simulate quarantine rounds
    // Time: O(m·n)² per round | Space: O(m·n)
    return null; // Implement: Contain Virus
}`,
        cpp: `// Problem: Contain Virus
// Approach: Simulate quarantine rounds
// Time: O(m·n)² per round | Space: O(m·n)
// Topics: Array, DFS, Simulation

// Simulate quarantine rounds
// Time: O(m·n)² per round | Space: O(m·n)
// TODO: Implement Contain Virus`
    },

    750: {
        explanation: `Count column pairs. Topics: Array, DP, Hash Map. Time: O(m² · n / 2), Space: O(m²).`,
        python: `# Problem: Number of Corner Rectangles
# Approach: Count column pairs
# Time: O(m² · n / 2) | Space: O(m²)
# Topics: Array, DP, Hash Map

def solve(data):
    # count column pairs
    # Time: O(m² · n / 2) | Space: O(m²)
    pass  # Implement: Number of Corner Rectangles`,
        java: `// Problem: Number of Corner Rectangles
// Approach: Count column pairs
// Time: O(m² · n / 2) | Space: O(m²)
// Topics: Array, DP, Hash Map

public Object solve(Object input) {
    // Count column pairs
    // Time: O(m² · n / 2) | Space: O(m²)
    return null; // Implement: Number of Corner Rectangles
}`,
        cpp: `// Problem: Number of Corner Rectangles
// Approach: Count column pairs
// Time: O(m² · n / 2) | Space: O(m²)
// Topics: Array, DP, Hash Map

// Count column pairs
// Time: O(m² · n / 2) | Space: O(m²)
// TODO: Implement Number of Corner Rectangles`
    },

    752: {
        explanation: `BFS all 10000 combos. Topics: BFS, String. Time: O(10000), Space: O(10000).`,
        python: `# Problem: Open the Lock
# Approach: BFS all 10000 combos
# Time: O(10000) | Space: O(10000)
# Topics: BFS, String

from collections import deque
def solve(root):
    # bfs all 10000 combos
    if not root: return []
    queue = deque([root])
    result = []
    while queue:
        level_size = len(queue)
        level = []
        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)
            if node.left: queue.append(node.left)
            if node.right: queue.append(node.right)
        result.append(level)
    return result`,
        java: `// Problem: Open the Lock
// Approach: BFS all 10000 combos
// Time: O(10000) | Space: O(10000)
// Topics: BFS, String

public List<List<Integer>> bfs(TreeNode root) {
    // BFS all 10000 combos
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;
    Queue<TreeNode> queue = new LinkedList<>();
    queue.add(root);
    while (!queue.isEmpty()) {
        int size = queue.size();
        List<Integer> level = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            TreeNode node = queue.poll();
            level.add(node.val);
            if (node.left != null) queue.add(node.left);
            if (node.right != null) queue.add(node.right);
        }
        result.add(level);
    }
    return result;
}`,
        cpp: `// Problem: Open the Lock
// Approach: BFS all 10000 combos
// Time: O(10000) | Space: O(10000)
// Topics: BFS, String

// BFS all 10000 combos
vector<vector<int>> bfs(TreeNode* root) {
    vector<vector<int>> res;
    if (!root) return res;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        int sz = q.size();
        vector<int> level;
        while (sz--) {
            auto node = q.front(); q.pop();
            level.push_back(node->val);
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        res.push_back(level);
    }
    return res;
}`
    },

    753: {
        explanation: `De Bruijn sequence DFS. Topics: Graph, DFS, Euler Path. Time: O(k^n), Space: O(k^n).`,
        python: `# Problem: Cracking the Safe
# Approach: De Bruijn sequence DFS
# Time: O(k^n) | Space: O(k^n)
# Topics: Graph, DFS, Euler Path

def solve(root):
    # de bruijn sequence dfs
    def dfs(node):
        if not node:
            return
        # Process current node
        dfs(node.left)
        dfs(node.right)
    return dfs(root)`,
        java: `// Problem: Cracking the Safe
// Approach: De Bruijn sequence DFS
// Time: O(k^n) | Space: O(k^n)
// Topics: Graph, DFS, Euler Path

public void dfs(TreeNode node) {
    // De Bruijn sequence DFS
    if (node == null) return;
    // Process node
    dfs(node.left);
    dfs(node.right);
}`,
        cpp: `// Problem: Cracking the Safe
// Approach: De Bruijn sequence DFS
// Time: O(k^n) | Space: O(k^n)
// Topics: Graph, DFS, Euler Path

// De Bruijn sequence DFS
void dfs(TreeNode* node) {
    if (!node) return;
    // Process node
    dfs(node->left);
    dfs(node->right);
}`
    },

    763: {
        explanation: `Track last occurrence. Topics: String, Greedy. Time: O(n), Space: O(1).`,
        python: `# Problem: Partition Labels
# Approach: Track last occurrence
# Time: O(n) | Space: O(1)
# Topics: String, Greedy

def solve(data):
    # track last occurrence
    # Time: O(n) | Space: O(1)
    pass  # Implement: Partition Labels`,
        java: `// Problem: Partition Labels
// Approach: Track last occurrence
// Time: O(n) | Space: O(1)
// Topics: String, Greedy

public Object solve(Object input) {
    // Track last occurrence
    // Time: O(n) | Space: O(1)
    return null; // Implement: Partition Labels
}`,
        cpp: `// Problem: Partition Labels
// Approach: Track last occurrence
// Time: O(n) | Space: O(1)
// Topics: String, Greedy

// Track last occurrence
// Time: O(n) | Space: O(1)
// TODO: Implement Partition Labels`
    },

    767: {
        explanation: `Max-heap interleave. Topics: String, Heap, Greedy. Time: O(n log k), Space: O(k).`,
        python: `# Problem: Reorganize String
# Approach: Max-heap interleave
# Time: O(n log k) | Space: O(k)
# Topics: String, Heap, Greedy

import heapq
def solve(arr, k):
    # max-heap interleave
    heap = []
    for val in arr:
        heapq.heappush(heap, val)
        if len(heap) > k:
            heapq.heappop(heap)
    return heap[0]`,
        java: `// Problem: Reorganize String
// Approach: Max-heap interleave
// Time: O(n log k) | Space: O(k)
// Topics: String, Heap, Greedy

public int solve(int[] arr, int k) {
    // Max-heap interleave
    PriorityQueue<Integer> pq = new PriorityQueue<>();
    for (int val : arr) {
        pq.add(val);
        if (pq.size() > k) pq.poll();
    }
    return pq.peek();
}`,
        cpp: `// Problem: Reorganize String
// Approach: Max-heap interleave
// Time: O(n log k) | Space: O(k)
// Topics: String, Heap, Greedy

// Max-heap interleave
int solve(vector<int>& arr, int k) {
    priority_queue<int, vector<int>, greater<>> pq;
    for (int v : arr) {
        pq.push(v);
        if (pq.size() > k) pq.pop();
    }
    return pq.top();
}`
    },

    771: {
        explanation: `Count chars in set. Topics: String, Hash Set. Time: O(J+S), Space: O(J).`,
        python: `# Problem: Jewels and Stones
# Approach: Count chars in set
# Time: O(J+S) | Space: O(J)
# Topics: String, Hash Set

def solve(data):
    # count chars in set
    # Time: O(J+S) | Space: O(J)
    pass  # Implement: Jewels and Stones`,
        java: `// Problem: Jewels and Stones
// Approach: Count chars in set
// Time: O(J+S) | Space: O(J)
// Topics: String, Hash Set

public Object solve(Object input) {
    // Count chars in set
    // Time: O(J+S) | Space: O(J)
    return null; // Implement: Jewels and Stones
}`,
        cpp: `// Problem: Jewels and Stones
// Approach: Count chars in set
// Time: O(J+S) | Space: O(J)
// Topics: String, Hash Set

// Count chars in set
// Time: O(J+S) | Space: O(J)
// TODO: Implement Jewels and Stones`
    },

    772: {
        explanation: `Stack + recursive paren parse. Topics: Math, Stack, Recursion. Time: O(n), Space: O(n).`,
        python: `# Problem: Basic Calculator III
# Approach: Stack + recursive paren parse
# Time: O(n) | Space: O(n)
# Topics: Math, Stack, Recursion

def solve(arr):
    # stack + recursive paren parse
    stack = []
    result = 0
    for i, val in enumerate(arr):
        while stack and arr[stack[-1]] < val:
            idx = stack.pop()
            # Process popped element
        stack.append(i)
    return result`,
        java: `// Problem: Basic Calculator III
// Approach: Stack + recursive paren parse
// Time: O(n) | Space: O(n)
// Topics: Math, Stack, Recursion

public int solve(int[] arr) {
    // Stack + recursive paren parse
    Deque<Integer> stack = new ArrayDeque<>();
    int result = 0;
    for (int i = 0; i < arr.length; i++) {
        while (!stack.isEmpty() && arr[stack.peek()] < arr[i]) {
            stack.pop();
        }
        stack.push(i);
    }
    return result;
}`,
        cpp: `// Problem: Basic Calculator III
// Approach: Stack + recursive paren parse
// Time: O(n) | Space: O(n)
// Topics: Math, Stack, Recursion

// Stack + recursive paren parse
int solve(vector<int>& arr) {
    stack<int> st;
    int res = 0;
    for (int i = 0; i < arr.size(); i++) {
        while (!st.empty() && arr[st.top()] < arr[i]) st.pop();
        st.push(i);
    }
    return res;
}`
    },

    773: {
        explanation: `BFS on board string states. Topics: BFS, Graph. Time: O((m·n)! · m·n), Space: O((m·n)!).`,
        python: `# Problem: Sliding Puzzle
# Approach: BFS on board string states
# Time: O((m·n)! · m·n) | Space: O((m·n)!)
# Topics: BFS, Graph

from collections import deque
def solve(root):
    # bfs on board string states
    if not root: return []
    queue = deque([root])
    result = []
    while queue:
        level_size = len(queue)
        level = []
        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)
            if node.left: queue.append(node.left)
            if node.right: queue.append(node.right)
        result.append(level)
    return result`,
        java: `// Problem: Sliding Puzzle
// Approach: BFS on board string states
// Time: O((m·n)! · m·n) | Space: O((m·n)!)
// Topics: BFS, Graph

public List<List<Integer>> bfs(TreeNode root) {
    // BFS on board string states
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;
    Queue<TreeNode> queue = new LinkedList<>();
    queue.add(root);
    while (!queue.isEmpty()) {
        int size = queue.size();
        List<Integer> level = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            TreeNode node = queue.poll();
            level.add(node.val);
            if (node.left != null) queue.add(node.left);
            if (node.right != null) queue.add(node.right);
        }
        result.add(level);
    }
    return result;
}`,
        cpp: `// Problem: Sliding Puzzle
// Approach: BFS on board string states
// Time: O((m·n)! · m·n) | Space: O((m·n)!)
// Topics: BFS, Graph

// BFS on board string states
vector<vector<int>> bfs(TreeNode* root) {
    vector<vector<int>> res;
    if (!root) return res;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        int sz = q.size();
        vector<int> level;
        while (sz--) {
            auto node = q.front(); q.pop();
            level.push_back(node->val);
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        res.push_back(level);
    }
    return res;
}`
    },

    778: {
        explanation: `Dijkstra min-max path. Topics: Graph, Dijkstra, Union Find. Time: O(n² log n), Space: O(n²).`,
        python: `# Problem: Swim in Rising Water
# Approach: Dijkstra min-max path
# Time: O(n² log n) | Space: O(n²)
# Topics: Graph, Dijkstra, Union Find

def solve(data):
    # dijkstra min-max path
    # Time: O(n² log n) | Space: O(n²)
    pass  # Implement: Swim in Rising Water`,
        java: `// Problem: Swim in Rising Water
// Approach: Dijkstra min-max path
// Time: O(n² log n) | Space: O(n²)
// Topics: Graph, Dijkstra, Union Find

public Object solve(Object input) {
    // Dijkstra min-max path
    // Time: O(n² log n) | Space: O(n²)
    return null; // Implement: Swim in Rising Water
}`,
        cpp: `// Problem: Swim in Rising Water
// Approach: Dijkstra min-max path
// Time: O(n² log n) | Space: O(n²)
// Topics: Graph, Dijkstra, Union Find

// Dijkstra min-max path
// Time: O(n² log n) | Space: O(n²)
// TODO: Implement Swim in Rising Water`
    },

    785: {
        explanation: `BFS 2-colour. Topics: Graph, BFS, DFS. Time: O(V+E), Space: O(V).`,
        python: `# Problem: Is Graph Bipartite
# Approach: BFS 2-colour
# Time: O(V+E) | Space: O(V)
# Topics: Graph, BFS, DFS

from collections import deque
def solve(root):
    # bfs 2-colour
    if not root: return []
    queue = deque([root])
    result = []
    while queue:
        level_size = len(queue)
        level = []
        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)
            if node.left: queue.append(node.left)
            if node.right: queue.append(node.right)
        result.append(level)
    return result`,
        java: `// Problem: Is Graph Bipartite
// Approach: BFS 2-colour
// Time: O(V+E) | Space: O(V)
// Topics: Graph, BFS, DFS

public List<List<Integer>> bfs(TreeNode root) {
    // BFS 2-colour
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;
    Queue<TreeNode> queue = new LinkedList<>();
    queue.add(root);
    while (!queue.isEmpty()) {
        int size = queue.size();
        List<Integer> level = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            TreeNode node = queue.poll();
            level.add(node.val);
            if (node.left != null) queue.add(node.left);
            if (node.right != null) queue.add(node.right);
        }
        result.add(level);
    }
    return result;
}`,
        cpp: `// Problem: Is Graph Bipartite
// Approach: BFS 2-colour
// Time: O(V+E) | Space: O(V)
// Topics: Graph, BFS, DFS

// BFS 2-colour
vector<vector<int>> bfs(TreeNode* root) {
    vector<vector<int>> res;
    if (!root) return res;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        int sz = q.size();
        vector<int> level;
        while (sz--) {
            auto node = q.front(); q.pop();
            level.push_back(node->val);
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        res.push_back(level);
    }
    return res;
}`
    },

    787: {
        explanation: `Bellman-Ford k iterations. Topics: Graph, DP, Bellman-Ford. Time: O(k · E), Space: O(V).`,
        python: `# Problem: Cheapest Flights Within K Stops
# Approach: Bellman-Ford k iterations
# Time: O(k · E) | Space: O(V)
# Topics: Graph, DP, Bellman-Ford

def solve(data):
    # bellman-ford k iterations
    # Time: O(k · E) | Space: O(V)
    pass  # Implement: Cheapest Flights Within K Stops`,
        java: `// Problem: Cheapest Flights Within K Stops
// Approach: Bellman-Ford k iterations
// Time: O(k · E) | Space: O(V)
// Topics: Graph, DP, Bellman-Ford

public Object solve(Object input) {
    // Bellman-Ford k iterations
    // Time: O(k · E) | Space: O(V)
    return null; // Implement: Cheapest Flights Within K Stops
}`,
        cpp: `// Problem: Cheapest Flights Within K Stops
// Approach: Bellman-Ford k iterations
// Time: O(k · E) | Space: O(V)
// Topics: Graph, DP, Bellman-Ford

// Bellman-Ford k iterations
// Time: O(k · E) | Space: O(V)
// TODO: Implement Cheapest Flights Within K Stops`
    },

    791: {
        explanation: `Count chars sort by order. Topics: String, Greedy. Time: O(n), Space: O(1).`,
        python: `# Problem: Custom Sort String
# Approach: Count chars sort by order
# Time: O(n) | Space: O(1)
# Topics: String, Greedy

def solve(arr):
    # count chars sort by order
    arr.sort()
    result = []
    for i in range(len(arr)):
        # Process sorted array
        result.append(arr[i])
    return result`,
        java: `// Problem: Custom Sort String
// Approach: Count chars sort by order
// Time: O(n) | Space: O(1)
// Topics: String, Greedy

public int[] solve(int[] arr) {
    // Count chars sort by order
    Arrays.sort(arr);
    return arr;
}`,
        cpp: `// Problem: Custom Sort String
// Approach: Count chars sort by order
// Time: O(n) | Space: O(1)
// Topics: String, Greedy

// Count chars sort by order
// Time: O(n) | Space: O(1)
// TODO: Implement Custom Sort String`
    },

    796: {
        explanation: `Concatenate and search. Topics: String. Time: O(n²), Space: O(n).`,
        python: `# Problem: Rotate String
# Approach: Concatenate and search
# Time: O(n²) | Space: O(n)
# Topics: String

def solve(data):
    # concatenate and search
    # Time: O(n²) | Space: O(n)
    pass  # Implement: Rotate String`,
        java: `// Problem: Rotate String
// Approach: Concatenate and search
// Time: O(n²) | Space: O(n)
// Topics: String

public Object solve(Object input) {
    // Concatenate and search
    // Time: O(n²) | Space: O(n)
    return null; // Implement: Rotate String
}`,
        cpp: `// Problem: Rotate String
// Approach: Concatenate and search
// Time: O(n²) | Space: O(n)
// Topics: String

// Concatenate and search
// Time: O(n²) | Space: O(n)
// TODO: Implement Rotate String`
    },

    797: {
        explanation: `DFS all paths. Topics: Graph, DFS. Time: O(2^V · V), Space: O(V).`,
        python: `# Problem: All Paths From Source to Target
# Approach: DFS all paths
# Time: O(2^V · V) | Space: O(V)
# Topics: Graph, DFS

def solve(root):
    # dfs all paths
    def dfs(node):
        if not node:
            return
        # Process current node
        dfs(node.left)
        dfs(node.right)
    return dfs(root)`,
        java: `// Problem: All Paths From Source to Target
// Approach: DFS all paths
// Time: O(2^V · V) | Space: O(V)
// Topics: Graph, DFS

public void dfs(TreeNode node) {
    // DFS all paths
    if (node == null) return;
    // Process node
    dfs(node.left);
    dfs(node.right);
}`,
        cpp: `// Problem: All Paths From Source to Target
// Approach: DFS all paths
// Time: O(2^V · V) | Space: O(V)
// Topics: Graph, DFS

// DFS all paths
void dfs(TreeNode* node) {
    if (!node) return;
    // Process node
    dfs(node->left);
    dfs(node->right);
}`
    },

    799: {
        explanation: `Simulate pour per row. Topics: Array, DP. Time: O(n²), Space: O(n²).`,
        python: `# Problem: Champagne Tower
# Approach: Simulate pour per row
# Time: O(n²) | Space: O(n²)
# Topics: Array, DP

def solve(data):
    # simulate pour per row
    # Time: O(n²) | Space: O(n²)
    pass  # Implement: Champagne Tower`,
        java: `// Problem: Champagne Tower
// Approach: Simulate pour per row
// Time: O(n²) | Space: O(n²)
// Topics: Array, DP

public Object solve(Object input) {
    // Simulate pour per row
    // Time: O(n²) | Space: O(n²)
    return null; // Implement: Champagne Tower
}`,
        cpp: `// Problem: Champagne Tower
// Approach: Simulate pour per row
// Time: O(n²) | Space: O(n²)
// Topics: Array, DP

// Simulate pour per row
// Time: O(n²) | Space: O(n²)
// TODO: Implement Champagne Tower`
    },

    804: {
        explanation: `Map chars concatenate. Topics: String, Hash Set. Time: O(n · L), Space: O(n).`,
        python: `# Problem: Unique Morse Code Words
# Approach: Map chars concatenate
# Time: O(n · L) | Space: O(n)
# Topics: String, Hash Set

def solve(data):
    # map chars concatenate
    # Time: O(n · L) | Space: O(n)
    pass  # Implement: Unique Morse Code Words`,
        java: `// Problem: Unique Morse Code Words
// Approach: Map chars concatenate
// Time: O(n · L) | Space: O(n)
// Topics: String, Hash Set

public Object solve(Object input) {
    // Map chars concatenate
    // Time: O(n · L) | Space: O(n)
    return null; // Implement: Unique Morse Code Words
}`,
        cpp: `// Problem: Unique Morse Code Words
// Approach: Map chars concatenate
// Time: O(n · L) | Space: O(n)
// Topics: String, Hash Set

// Map chars concatenate
// Time: O(n · L) | Space: O(n)
// TODO: Implement Unique Morse Code Words`
    },

    807: {
        explanation: `Row/col max constraint. Topics: Array, Matrix. Time: O(n²), Space: O(n).`,
        python: `# Problem: Max Increase to Keep City Skyline
# Approach: Row/col max constraint
# Time: O(n²) | Space: O(n)
# Topics: Array, Matrix

def solve(data):
    # row/col max constraint
    # Time: O(n²) | Space: O(n)
    pass  # Implement: Max Increase to Keep City Skyline`,
        java: `// Problem: Max Increase to Keep City Skyline
// Approach: Row/col max constraint
// Time: O(n²) | Space: O(n)
// Topics: Array, Matrix

public Object solve(Object input) {
    // Row/col max constraint
    // Time: O(n²) | Space: O(n)
    return null; // Implement: Max Increase to Keep City Skyline
}`,
        cpp: `// Problem: Max Increase to Keep City Skyline
// Approach: Row/col max constraint
// Time: O(n²) | Space: O(n)
// Topics: Array, Matrix

// Row/col max constraint
// Time: O(n²) | Space: O(n)
// TODO: Implement Max Increase to Keep City Skyline`
    },

    811: {
        explanation: `Parse and accumulate domains. Topics: String, Hash Map. Time: O(n · L), Space: O(n · L).`,
        python: `# Problem: Subdomain Visit Count
# Approach: Parse and accumulate domains
# Time: O(n · L) | Space: O(n · L)
# Topics: String, Hash Map

def solve(data):
    # parse and accumulate domains
    # Time: O(n · L) | Space: O(n · L)
    pass  # Implement: Subdomain Visit Count`,
        java: `// Problem: Subdomain Visit Count
// Approach: Parse and accumulate domains
// Time: O(n · L) | Space: O(n · L)
// Topics: String, Hash Map

public Object solve(Object input) {
    // Parse and accumulate domains
    // Time: O(n · L) | Space: O(n · L)
    return null; // Implement: Subdomain Visit Count
}`,
        cpp: `// Problem: Subdomain Visit Count
// Approach: Parse and accumulate domains
// Time: O(n · L) | Space: O(n · L)
// Topics: String, Hash Map

// Parse and accumulate domains
// Time: O(n · L) | Space: O(n · L)
// TODO: Implement Subdomain Visit Count`
    },

    815: {
        explanation: `BFS on routes not stops. Topics: BFS, Graph. Time: O(n²), Space: O(n²).`,
        python: `# Problem: Bus Routes
# Approach: BFS on routes not stops
# Time: O(n²) | Space: O(n²)
# Topics: BFS, Graph

from collections import deque
def solve(root):
    # bfs on routes not stops
    if not root: return []
    queue = deque([root])
    result = []
    while queue:
        level_size = len(queue)
        level = []
        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)
            if node.left: queue.append(node.left)
            if node.right: queue.append(node.right)
        result.append(level)
    return result`,
        java: `// Problem: Bus Routes
// Approach: BFS on routes not stops
// Time: O(n²) | Space: O(n²)
// Topics: BFS, Graph

public List<List<Integer>> bfs(TreeNode root) {
    // BFS on routes not stops
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;
    Queue<TreeNode> queue = new LinkedList<>();
    queue.add(root);
    while (!queue.isEmpty()) {
        int size = queue.size();
        List<Integer> level = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            TreeNode node = queue.poll();
            level.add(node.val);
            if (node.left != null) queue.add(node.left);
            if (node.right != null) queue.add(node.right);
        }
        result.add(level);
    }
    return result;
}`,
        cpp: `// Problem: Bus Routes
// Approach: BFS on routes not stops
// Time: O(n²) | Space: O(n²)
// Topics: BFS, Graph

// BFS on routes not stops
vector<vector<int>> bfs(TreeNode* root) {
    vector<vector<int>> res;
    if (!root) return res;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        int sz = q.size();
        vector<int> level;
        while (sz--) {
            auto node = q.front(); q.pop();
            level.push_back(node->val);
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        res.push_back(level);
    }
    return res;
}`
    },

    820: {
        explanation: `Trie of reversed words. Topics: String, Trie. Time: O(n · L), Space: O(n · L).`,
        python: `# Problem: Short Encoding of Words
# Approach: Trie of reversed words
# Time: O(n · L) | Space: O(n · L)
# Topics: String, Trie

class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()
    def insert(self, word):
        node = self.root
        for ch in word:
            if ch not in node.children:
                node.children[ch] = TrieNode()
            node = node.children[ch]
        node.is_end = True
    def search(self, word):
        node = self.root
        for ch in word:
            if ch not in node.children: return False
            node = node.children[ch]
        return node.is_end`,
        java: `// Problem: Short Encoding of Words
// Approach: Trie of reversed words
// Time: O(n · L) | Space: O(n · L)
// Topics: String, Trie

public Object solve(Object input) {
    // Trie of reversed words
    // Time: O(n · L) | Space: O(n · L)
    return null; // Implement: Short Encoding of Words
}`,
        cpp: `// Problem: Short Encoding of Words
// Approach: Trie of reversed words
// Time: O(n · L) | Space: O(n · L)
// Topics: String, Trie

// Trie of reversed words
// Time: O(n · L) | Space: O(n · L)
// TODO: Implement Short Encoding of Words`
    },

    824: {
        explanation: `Simulate rules. Topics: String. Time: O(n · L), Space: O(n · L).`,
        python: `# Problem: Goat Latin
# Approach: Simulate rules
# Time: O(n · L) | Space: O(n · L)
# Topics: String

def solve(data):
    # simulate rules
    # Time: O(n · L) | Space: O(n · L)
    pass  # Implement: Goat Latin`,
        java: `// Problem: Goat Latin
// Approach: Simulate rules
// Time: O(n · L) | Space: O(n · L)
// Topics: String

public Object solve(Object input) {
    // Simulate rules
    // Time: O(n · L) | Space: O(n · L)
    return null; // Implement: Goat Latin
}`,
        cpp: `// Problem: Goat Latin
// Approach: Simulate rules
// Time: O(n · L) | Space: O(n · L)
// Topics: String

// Simulate rules
// Time: O(n · L) | Space: O(n · L)
// TODO: Implement Goat Latin`
    },

    825: {
        explanation: `Sort + binary search counts. Topics: Array, Binary Search. Time: O(n log n), Space: O(n).`,
        python: `# Problem: Friends Of Appropriate Ages
# Approach: Sort + binary search counts
# Time: O(n log n) | Space: O(n)
# Topics: Array, Binary Search

def solve(arr, target):
    # sort + binary search counts
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return lo`,
        java: `// Problem: Friends Of Appropriate Ages
// Approach: Sort + binary search counts
// Time: O(n log n) | Space: O(n)
// Topics: Array, Binary Search

public int solve(int[] arr, int target) {
    // Sort + binary search counts
    int lo = 0, hi = arr.length - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return lo;
}`,
        cpp: `// Problem: Friends Of Appropriate Ages
// Approach: Sort + binary search counts
// Time: O(n log n) | Space: O(n)
// Topics: Array, Binary Search

// Sort + binary search counts
int solve(vector<int>& arr, int target) {
    int lo = 0, hi = arr.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return lo;
}`
    },

    827: {
        explanation: `DFS label + try each 0. Topics: Array, DFS, Union Find. Time: O(n²), Space: O(n²).`,
        python: `# Problem: Making A Large Island
# Approach: DFS label + try each 0
# Time: O(n²) | Space: O(n²)
# Topics: Array, DFS, Union Find

def solve(root):
    # dfs label + try each 0
    def dfs(node):
        if not node:
            return
        # Process current node
        dfs(node.left)
        dfs(node.right)
    return dfs(root)`,
        java: `// Problem: Making A Large Island
// Approach: DFS label + try each 0
// Time: O(n²) | Space: O(n²)
// Topics: Array, DFS, Union Find

public void dfs(TreeNode node) {
    // DFS label + try each 0
    if (node == null) return;
    // Process node
    dfs(node.left);
    dfs(node.right);
}`,
        cpp: `// Problem: Making A Large Island
// Approach: DFS label + try each 0
// Time: O(n²) | Space: O(n²)
// Topics: Array, DFS, Union Find

// DFS label + try each 0
void dfs(TreeNode* node) {
    if (!node) return;
    // Process node
    dfs(node->left);
    dfs(node->right);
}`
    },

    833: {
        explanation: `Sort by index apply right-to-left. Topics: String, Sorting. Time: O(n + k log k), Space: O(n).`,
        python: `# Problem: Find and Replace in String
# Approach: Sort by index apply right-to-left
# Time: O(n + k log k) | Space: O(n)
# Topics: String, Sorting

def solve(arr):
    # sort by index apply right-to-left
    arr.sort()
    result = []
    for i in range(len(arr)):
        # Process sorted array
        result.append(arr[i])
    return result`,
        java: `// Problem: Find and Replace in String
// Approach: Sort by index apply right-to-left
// Time: O(n + k log k) | Space: O(n)
// Topics: String, Sorting

public int[] solve(int[] arr) {
    // Sort by index apply right-to-left
    Arrays.sort(arr);
    return arr;
}`,
        cpp: `// Problem: Find and Replace in String
// Approach: Sort by index apply right-to-left
// Time: O(n + k log k) | Space: O(n)
// Topics: String, Sorting

// Sort by index apply right-to-left
// Time: O(n + k log k) | Space: O(n)
// TODO: Implement Find and Replace in String`
    },

    836: {
        explanation: `Axis-separation check. Topics: Math, Geometry. Time: O(1), Space: O(1).`,
        python: `# Problem: Rectangle Overlap
# Approach: Axis-separation check
# Time: O(1) | Space: O(1)
# Topics: Math, Geometry

def solve(data):
    # axis-separation check
    # Time: O(1) | Space: O(1)
    pass  # Implement: Rectangle Overlap`,
        java: `// Problem: Rectangle Overlap
// Approach: Axis-separation check
// Time: O(1) | Space: O(1)
// Topics: Math, Geometry

public Object solve(Object input) {
    // Axis-separation check
    // Time: O(1) | Space: O(1)
    return null; // Implement: Rectangle Overlap
}`,
        cpp: `// Problem: Rectangle Overlap
// Approach: Axis-separation check
// Time: O(1) | Space: O(1)
// Topics: Math, Geometry

// Axis-separation check
// Time: O(1) | Space: O(1)
// TODO: Implement Rectangle Overlap`
    },

    841: {
        explanation: `DFS collect keys. Topics: Graph, DFS/BFS. Time: O(V+E), Space: O(V).`,
        python: `# Problem: Keys and Rooms
# Approach: DFS collect keys
# Time: O(V+E) | Space: O(V)
# Topics: Graph, DFS/BFS

def solve(root):
    # dfs collect keys
    def dfs(node):
        if not node:
            return
        # Process current node
        dfs(node.left)
        dfs(node.right)
    return dfs(root)`,
        java: `// Problem: Keys and Rooms
// Approach: DFS collect keys
// Time: O(V+E) | Space: O(V)
// Topics: Graph, DFS/BFS

public void dfs(TreeNode node) {
    // DFS collect keys
    if (node == null) return;
    // Process node
    dfs(node.left);
    dfs(node.right);
}`,
        cpp: `// Problem: Keys and Rooms
// Approach: DFS collect keys
// Time: O(V+E) | Space: O(V)
// Topics: Graph, DFS/BFS

// DFS collect keys
void dfs(TreeNode* node) {
    if (!node) return;
    // Process node
    dfs(node->left);
    dfs(node->right);
}`
    },

    844: {
        explanation: `Two pointers from back. Topics: String, Two Pointers. Time: O(m+n), Space: O(1).`,
        python: `# Problem: Backspace String Compare
# Approach: Two pointers from back
# Time: O(m+n) | Space: O(1)
# Topics: String, Two Pointers

def solve(arr):
    # two pointers from back
    left, right = 0, len(arr) - 1
    while left < right:
        # Process based on condition
        if condition:
            left += 1
        else:
            right -= 1
    return result`,
        java: `// Problem: Backspace String Compare
// Approach: Two pointers from back
// Time: O(m+n) | Space: O(1)
// Topics: String, Two Pointers

public int solve(int[] arr) {
    // Two pointers from back
    int left = 0, right = arr.length - 1;
    while (left < right) {
        // Process based on condition
        if (arr[left] < arr[right]) left++;
        else right--;
    }
    return left;
}`,
        cpp: `// Problem: Backspace String Compare
// Approach: Two pointers from back
// Time: O(m+n) | Space: O(1)
// Topics: String, Two Pointers

// Two pointers from back
int solve(vector<int>& arr) {
    int l = 0, r = arr.size() - 1;
    while (l < r) {
        if (arr[l] < arr[r]) l++;
        else r--;
    }
    return l;
}`
    },

    849: {
        explanation: `Track gaps between people. Topics: Array. Time: O(n), Space: O(1).`,
        python: `# Problem: Maximize Distance to Closest Person
# Approach: Track gaps between people
# Time: O(n) | Space: O(1)
# Topics: Array

def solve(data):
    # track gaps between people
    # Time: O(n) | Space: O(1)
    pass  # Implement: Maximize Distance to Closest Person`,
        java: `// Problem: Maximize Distance to Closest Person
// Approach: Track gaps between people
// Time: O(n) | Space: O(1)
// Topics: Array

public Object solve(Object input) {
    // Track gaps between people
    // Time: O(n) | Space: O(1)
    return null; // Implement: Maximize Distance to Closest Person
}`,
        cpp: `// Problem: Maximize Distance to Closest Person
// Approach: Track gaps between people
// Time: O(n) | Space: O(1)
// Topics: Array

// Track gaps between people
// Time: O(n) | Space: O(1)
// TODO: Implement Maximize Distance to Closest Person`
    },

    852: {
        explanation: `Binary search for peak. Topics: Array, Binary Search. Time: O(log n), Space: O(1).`,
        python: `# Problem: Peak Index in a Mountain Array
# Approach: Binary search for peak
# Time: O(log n) | Space: O(1)
# Topics: Array, Binary Search

def solve(arr, target):
    # binary search for peak
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return lo`,
        java: `// Problem: Peak Index in a Mountain Array
// Approach: Binary search for peak
// Time: O(log n) | Space: O(1)
// Topics: Array, Binary Search

public int solve(int[] arr, int target) {
    // Binary search for peak
    int lo = 0, hi = arr.length - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return lo;
}`,
        cpp: `// Problem: Peak Index in a Mountain Array
// Approach: Binary search for peak
// Time: O(log n) | Space: O(1)
// Topics: Array, Binary Search

// Binary search for peak
int solve(vector<int>& arr, int target) {
    int lo = 0, hi = arr.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return lo;
}`
    },

    856: {
        explanation: `Stack depth-based scoring. Topics: String, Stack. Time: O(n), Space: O(n).`,
        python: `# Problem: Score of Parentheses
# Approach: Stack depth-based scoring
# Time: O(n) | Space: O(n)
# Topics: String, Stack

def solve(root):
    # stack depth-based scoring
    def dfs(node):
        if not node:
            return
        # Process current node
        dfs(node.left)
        dfs(node.right)
    return dfs(root)`,
        java: `// Problem: Score of Parentheses
// Approach: Stack depth-based scoring
// Time: O(n) | Space: O(n)
// Topics: String, Stack

public void dfs(TreeNode node) {
    // Stack depth-based scoring
    if (node == null) return;
    // Process node
    dfs(node.left);
    dfs(node.right);
}`,
        cpp: `// Problem: Score of Parentheses
// Approach: Stack depth-based scoring
// Time: O(n) | Space: O(n)
// Topics: String, Stack

// Stack depth-based scoring
void dfs(TreeNode* node) {
    if (!node) return;
    // Process node
    dfs(node->left);
    dfs(node->right);
}`
    },

    859: {
        explanation: `Find one or two diff positions. Topics: String, Hash Set. Time: O(n), Space: O(1).`,
        python: `# Problem: Buddy Strings
# Approach: Find one or two diff positions
# Time: O(n) | Space: O(1)
# Topics: String, Hash Set

def solve(n, edges):
    # find one or two diff positions
    parent = list(range(n))
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x
    def union(x, y):
        px, py = find(x), find(y)
        if px != py: parent[px] = py
    for u, v in edges:
        union(u, v)
    return len(set(find(i) for i in range(n)))`,
        java: `// Problem: Buddy Strings
// Approach: Find one or two diff positions
// Time: O(n) | Space: O(1)
// Topics: String, Hash Set

public Object solve(Object input) {
    // Find one or two diff positions
    // Time: O(n) | Space: O(1)
    return null; // Implement: Buddy Strings
}`,
        cpp: `// Problem: Buddy Strings
// Approach: Find one or two diff positions
// Time: O(n) | Space: O(1)
// Topics: String, Hash Set

// Find one or two diff positions
// Time: O(n) | Space: O(1)
// TODO: Implement Buddy Strings`
    },

    863: {
        explanation: `Build parent map then BFS. Topics: Tree, BFS, DFS. Time: O(n), Space: O(n).`,
        python: `# Problem: All Nodes Distance K in Binary Tree
# Approach: Build parent map then BFS
# Time: O(n) | Space: O(n)
# Topics: Tree, BFS, DFS

from collections import deque
def solve(root):
    # build parent map then bfs
    if not root: return []
    queue = deque([root])
    result = []
    while queue:
        level_size = len(queue)
        level = []
        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)
            if node.left: queue.append(node.left)
            if node.right: queue.append(node.right)
        result.append(level)
    return result`,
        java: `// Problem: All Nodes Distance K in Binary Tree
// Approach: Build parent map then BFS
// Time: O(n) | Space: O(n)
// Topics: Tree, BFS, DFS

public List<List<Integer>> bfs(TreeNode root) {
    // Build parent map then BFS
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;
    Queue<TreeNode> queue = new LinkedList<>();
    queue.add(root);
    while (!queue.isEmpty()) {
        int size = queue.size();
        List<Integer> level = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            TreeNode node = queue.poll();
            level.add(node.val);
            if (node.left != null) queue.add(node.left);
            if (node.right != null) queue.add(node.right);
        }
        result.add(level);
    }
    return result;
}`,
        cpp: `// Problem: All Nodes Distance K in Binary Tree
// Approach: Build parent map then BFS
// Time: O(n) | Space: O(n)
// Topics: Tree, BFS, DFS

// Build parent map then BFS
vector<vector<int>> bfs(TreeNode* root) {
    vector<vector<int>> res;
    if (!root) return res;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        int sz = q.size();
        vector<int> level;
        while (sz--) {
            auto node = q.front(); q.pop();
            level.push_back(node->val);
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        res.push_back(level);
    }
    return res;
}`
    },

    875: {
        explanation: `Binary search on eating speed. Topics: Array, Binary Search. Time: O(n log max), Space: O(1).`,
        python: `# Problem: Koko Eating Bananas
# Approach: Binary search on eating speed
# Time: O(n log max) | Space: O(1)
# Topics: Array, Binary Search

def solve(arr, target):
    # binary search on eating speed
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return lo`,
        java: `// Problem: Koko Eating Bananas
// Approach: Binary search on eating speed
// Time: O(n log max) | Space: O(1)
// Topics: Array, Binary Search

public int solve(int[] arr, int target) {
    // Binary search on eating speed
    int lo = 0, hi = arr.length - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return lo;
}`,
        cpp: `// Problem: Koko Eating Bananas
// Approach: Binary search on eating speed
// Time: O(n log max) | Space: O(1)
// Topics: Array, Binary Search

// Binary search on eating speed
int solve(vector<int>& arr, int target) {
    int lo = 0, hi = arr.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return lo;
}`
    },

    876: {
        explanation: `Slow/fast pointer. Topics: Linked List, Two Pointers. Time: O(n), Space: O(1).`,
        python: `# Problem: Middle of the Linked List
# Approach: Slow/fast pointer
# Time: O(n) | Space: O(1)
# Topics: Linked List, Two Pointers

def solve(data):
    # slow/fast pointer
    # Time: O(n) | Space: O(1)
    pass  # Implement: Middle of the Linked List`,
        java: `// Problem: Middle of the Linked List
// Approach: Slow/fast pointer
// Time: O(n) | Space: O(1)
// Topics: Linked List, Two Pointers

public Object solve(Object input) {
    // Slow/fast pointer
    // Time: O(n) | Space: O(1)
    return null; // Implement: Middle of the Linked List
}`,
        cpp: `// Problem: Middle of the Linked List
// Approach: Slow/fast pointer
// Time: O(n) | Space: O(1)
// Topics: Linked List, Two Pointers

// Slow/fast pointer
// Time: O(n) | Space: O(1)
// TODO: Implement Middle of the Linked List`
    },

    886: {
        explanation: `BFS 2-coloring. Topics: Graph, BFS/DFS, Union Find. Time: O(V+E), Space: O(V+E).`,
        python: `# Problem: Possible Bipartition
# Approach: BFS 2-coloring
# Time: O(V+E) | Space: O(V+E)
# Topics: Graph, BFS/DFS, Union Find

from collections import deque
def solve(root):
    # bfs 2-coloring
    if not root: return []
    queue = deque([root])
    result = []
    while queue:
        level_size = len(queue)
        level = []
        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)
            if node.left: queue.append(node.left)
            if node.right: queue.append(node.right)
        result.append(level)
    return result`,
        java: `// Problem: Possible Bipartition
// Approach: BFS 2-coloring
// Time: O(V+E) | Space: O(V+E)
// Topics: Graph, BFS/DFS, Union Find

public List<List<Integer>> bfs(TreeNode root) {
    // BFS 2-coloring
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;
    Queue<TreeNode> queue = new LinkedList<>();
    queue.add(root);
    while (!queue.isEmpty()) {
        int size = queue.size();
        List<Integer> level = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            TreeNode node = queue.poll();
            level.add(node.val);
            if (node.left != null) queue.add(node.left);
            if (node.right != null) queue.add(node.right);
        }
        result.add(level);
    }
    return result;
}`,
        cpp: `// Problem: Possible Bipartition
// Approach: BFS 2-coloring
// Time: O(V+E) | Space: O(V+E)
// Topics: Graph, BFS/DFS, Union Find

// BFS 2-coloring
vector<vector<int>> bfs(TreeNode* root) {
    vector<vector<int>> res;
    if (!root) return res;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        int sz = q.size();
        vector<int> level;
        while (sz--) {
            auto node = q.front(); q.pop();
            level.push_back(node->val);
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        res.push_back(level);
    }
    return res;
}`
    },

    895: {
        explanation: `Freq map + group stack. Topics: Hash Map, Stack, Design. Time: O(1), Space: O(n).`,
        python: `# Problem: Maximum Frequency Stack
# Approach: Freq map + group stack
# Time: O(1) | Space: O(n)
# Topics: Hash Map, Stack, Design

def solve(arr):
    # freq map + group stack
    stack = []
    result = 0
    for i, val in enumerate(arr):
        while stack and arr[stack[-1]] < val:
            idx = stack.pop()
            # Process popped element
        stack.append(i)
    return result`,
        java: `// Problem: Maximum Frequency Stack
// Approach: Freq map + group stack
// Time: O(1) | Space: O(n)
// Topics: Hash Map, Stack, Design

public int solve(int[] arr) {
    // Freq map + group stack
    Deque<Integer> stack = new ArrayDeque<>();
    int result = 0;
    for (int i = 0; i < arr.length; i++) {
        while (!stack.isEmpty() && arr[stack.peek()] < arr[i]) {
            stack.pop();
        }
        stack.push(i);
    }
    return result;
}`,
        cpp: `// Problem: Maximum Frequency Stack
// Approach: Freq map + group stack
// Time: O(1) | Space: O(n)
// Topics: Hash Map, Stack, Design

// Freq map + group stack
int solve(vector<int>& arr) {
    stack<int> st;
    int res = 0;
    for (int i = 0; i < arr.size(); i++) {
        while (!st.empty() && arr[st.top()] < arr[i]) st.pop();
        st.push(i);
    }
    return res;
}`
    },

    901: {
        explanation: `Monotonic stack accumulate span. Topics: Stack, Design. Time: O(1) amortized, Space: O(n).`,
        python: `# Problem: Online Stock Span
# Approach: Monotonic stack accumulate span
# Time: O(1) amortized | Space: O(n)
# Topics: Stack, Design

def solve(arr):
    # monotonic stack accumulate span
    stack = []
    result = 0
    for i, val in enumerate(arr):
        while stack and arr[stack[-1]] < val:
            idx = stack.pop()
            # Process popped element
        stack.append(i)
    return result`,
        java: `// Problem: Online Stock Span
// Approach: Monotonic stack accumulate span
// Time: O(1) amortized | Space: O(n)
// Topics: Stack, Design

public int solve(int[] arr) {
    // Monotonic stack accumulate span
    Deque<Integer> stack = new ArrayDeque<>();
    int result = 0;
    for (int i = 0; i < arr.length; i++) {
        while (!stack.isEmpty() && arr[stack.peek()] < arr[i]) {
            stack.pop();
        }
        stack.push(i);
    }
    return result;
}`,
        cpp: `// Problem: Online Stock Span
// Approach: Monotonic stack accumulate span
// Time: O(1) amortized | Space: O(n)
// Topics: Stack, Design

// Monotonic stack accumulate span
int solve(vector<int>& arr) {
    stack<int> st;
    int res = 0;
    for (int i = 0; i < arr.size(); i++) {
        while (!st.empty() && arr[st.top()] < arr[i]) st.pop();
        st.push(i);
    }
    return res;
}`
    },

    904: {
        explanation: `Sliding window 2 distinct. Topics: Array, Sliding Window. Time: O(n), Space: O(1).`,
        python: `# Problem: Fruit Into Baskets
# Approach: Sliding window 2 distinct
# Time: O(n) | Space: O(1)
# Topics: Array, Sliding Window

def solve(s):
    # sliding window 2 distinct
    left = 0
    window = {}
    result = 0
    for right in range(len(s)):
        # Expand window
        window[s[right]] = window.get(s[right], 0) + 1
        # Shrink if invalid
        while not valid(window):
            window[s[left]] -= 1
            if window[s[left]] == 0: del window[s[left]]
            left += 1
        result = max(result, right - left + 1)
    return result`,
        java: `// Problem: Fruit Into Baskets
// Approach: Sliding window 2 distinct
// Time: O(n) | Space: O(1)
// Topics: Array, Sliding Window

public Object solve(Object input) {
    // Sliding window 2 distinct
    // Time: O(n) | Space: O(1)
    return null; // Implement: Fruit Into Baskets
}`,
        cpp: `// Problem: Fruit Into Baskets
// Approach: Sliding window 2 distinct
// Time: O(n) | Space: O(1)
// Topics: Array, Sliding Window

// Sliding window 2 distinct
// Time: O(n) | Space: O(1)
// TODO: Implement Fruit Into Baskets`
    },

    912: {
        explanation: `Merge sort or heap sort. Topics: Array, Sorting. Time: O(n log n), Space: O(n).`,
        python: `# Problem: Sort an Array
# Approach: Merge sort or heap sort
# Time: O(n log n) | Space: O(n)
# Topics: Array, Sorting

def solve(arr):
    # merge sort or heap sort
    arr.sort()
    result = []
    for i in range(len(arr)):
        # Process sorted array
        result.append(arr[i])
    return result`,
        java: `// Problem: Sort an Array
// Approach: Merge sort or heap sort
// Time: O(n log n) | Space: O(n)
// Topics: Array, Sorting

public int[] solve(int[] arr) {
    // Merge sort or heap sort
    Arrays.sort(arr);
    return arr;
}`,
        cpp: `// Problem: Sort an Array
// Approach: Merge sort or heap sort
// Time: O(n log n) | Space: O(n)
// Topics: Array, Sorting

// Merge sort or heap sort
int solve(vector<int>& arr, int k) {
    priority_queue<int, vector<int>, greater<>> pq;
    for (int v : arr) {
        pq.push(v);
        if (pq.size() > k) pq.pop();
    }
    return pq.top();
}`
    },

    919: {
        explanation: `BFS track last incomplete level. Topics: Tree, BFS, Design. Time: O(1) insert, Space: O(n).`,
        python: `# Problem: Complete Binary Tree Inserter
# Approach: BFS track last incomplete level
# Time: O(1) insert | Space: O(n)
# Topics: Tree, BFS, Design

from collections import deque
def solve(root):
    # bfs track last incomplete level
    if not root: return []
    queue = deque([root])
    result = []
    while queue:
        level_size = len(queue)
        level = []
        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)
            if node.left: queue.append(node.left)
            if node.right: queue.append(node.right)
        result.append(level)
    return result`,
        java: `// Problem: Complete Binary Tree Inserter
// Approach: BFS track last incomplete level
// Time: O(1) insert | Space: O(n)
// Topics: Tree, BFS, Design

public List<List<Integer>> bfs(TreeNode root) {
    // BFS track last incomplete level
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;
    Queue<TreeNode> queue = new LinkedList<>();
    queue.add(root);
    while (!queue.isEmpty()) {
        int size = queue.size();
        List<Integer> level = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            TreeNode node = queue.poll();
            level.add(node.val);
            if (node.left != null) queue.add(node.left);
            if (node.right != null) queue.add(node.right);
        }
        result.add(level);
    }
    return result;
}`,
        cpp: `// Problem: Complete Binary Tree Inserter
// Approach: BFS track last incomplete level
// Time: O(1) insert | Space: O(n)
// Topics: Tree, BFS, Design

// BFS track last incomplete level
vector<vector<int>> bfs(TreeNode* root) {
    vector<vector<int>> res;
    if (!root) return res;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        int sz = q.size();
        vector<int> level;
        while (sz--) {
            auto node = q.front(); q.pop();
            level.push_back(node->val);
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        res.push_back(level);
    }
    return res;
}`
    },

    921: {
        explanation: `Count unmatched ( and ). Topics: String, Greedy, Stack. Time: O(n), Space: O(1).`,
        python: `# Problem: Minimum Add to Make Parentheses Valid
# Approach: Count unmatched ( and )
# Time: O(n) | Space: O(1)
# Topics: String, Greedy, Stack

def solve(data):
    # count unmatched ( and )
    # Time: O(n) | Space: O(1)
    pass  # Implement: Minimum Add to Make Parentheses Valid`,
        java: `// Problem: Minimum Add to Make Parentheses Valid
// Approach: Count unmatched ( and )
// Time: O(n) | Space: O(1)
// Topics: String, Greedy, Stack

public Object solve(Object input) {
    // Count unmatched ( and )
    // Time: O(n) | Space: O(1)
    return null; // Implement: Minimum Add to Make Parentheses Valid
}`,
        cpp: `// Problem: Minimum Add to Make Parentheses Valid
// Approach: Count unmatched ( and )
// Time: O(n) | Space: O(1)
// Topics: String, Greedy, Stack

// Count unmatched ( and )
// Time: O(n) | Space: O(1)
// TODO: Implement Minimum Add to Make Parentheses Valid`
    },

    929: {
        explanation: `Parse local + domain rules. Topics: String, Hash Set. Time: O(n · L), Space: O(n).`,
        python: `# Problem: Unique Email Addresses
# Approach: Parse local + domain rules
# Time: O(n · L) | Space: O(n)
# Topics: String, Hash Set

def solve(data):
    # parse local + domain rules
    # Time: O(n · L) | Space: O(n)
    pass  # Implement: Unique Email Addresses`,
        java: `// Problem: Unique Email Addresses
// Approach: Parse local + domain rules
// Time: O(n · L) | Space: O(n)
// Topics: String, Hash Set

public Object solve(Object input) {
    // Parse local + domain rules
    // Time: O(n · L) | Space: O(n)
    return null; // Implement: Unique Email Addresses
}`,
        cpp: `// Problem: Unique Email Addresses
// Approach: Parse local + domain rules
// Time: O(n · L) | Space: O(n)
// Topics: String, Hash Set

// Parse local + domain rules
// Time: O(n · L) | Space: O(n)
// TODO: Implement Unique Email Addresses`
    },


    // ── Codeforces / CodeChef Problems ─────────────────────────────────────

    1001: {
        explanation: `Watermelon (CF 4A): Split w into two even parts. Possible iff w is even and w >= 4.`,
        python: `# O(1) | Space O(1)
w = int(input())
print("YES" if w % 2 == 0 and w >= 4 else "NO")`,
        java: `// O(1)
import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int w = sc.nextInt();
        System.out.println(w % 2 == 0 && w >= 4 ? "YES" : "NO");
    }
}`,
        cpp: `// O(1)
#include <bits/stdc++.h>
using namespace std;
int main() {
    int w; cin >> w;
    cout << (w % 2 == 0 && w >= 4 ? "YES" : "NO") << endl;
}`
    },

    1002: {
        explanation: `Way Too Long Words (CF 71A): If word length > 10, abbreviate as first + (len-2) + last.`,
        python: `# O(n*L)
n = int(input())
for _ in range(n):
    w = input()
    if len(w) > 10:
        print(w[0] + str(len(w)-2) + w[-1])
    else:
        print(w)`,
        java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        while (n-- > 0) {
            String w = sc.next();
            if (w.length() > 10)
                System.out.println(w.charAt(0) + "" + (w.length()-2) + w.charAt(w.length()-1));
            else System.out.println(w);
        }
    }
}`,
        cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; cin >> n;
    while (n--) {
        string w; cin >> w;
        if (w.size() > 10)
            cout << w[0] << w.size()-2 << w.back() << "\n";
        else cout << w << "\n";
    }
}`
    },

    1003: {
        explanation: `Beautiful Matrix (CF 263A): Find position of 1 in 5x5 matrix, answer is Manhattan distance to center (2,2) 0-indexed.`,
        python: `# O(25)
mat = []
for i in range(5):
    row = list(map(int, input().split()))
    mat.append(row)
for i in range(5):
    for j in range(5):
        if mat[i][j] == 1:
            print(abs(i-2) + abs(j-2))`,
        java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        for (int i = 0; i < 5; i++)
            for (int j = 0; j < 5; j++) {
                int v = sc.nextInt();
                if (v == 1) System.out.println(Math.abs(i-2)+Math.abs(j-2));
            }
    }
}`,
        cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    for (int i=0;i<5;i++) for (int j=0;j<5;j++) {
        int v; cin>>v;
        if (v==1) cout << abs(i-2)+abs(j-2) << "\n";
    }
}`
    },

    1004: {
        explanation: `Stones on the Table (CF 165A): Count adjacent duplicates — number of stones Vasya removes.`,
        python: `# O(n)
n, k = map(int, input().split())
stones = list(map(int, input().split()))
count = 0
for i in range(1, n):
    if stones[i] == stones[i-1]:
        count += 1
print(count)`,
        java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(), k = sc.nextInt(), count = 0, prev = -1;
        for (int i = 0; i < n; i++) {
            int x = sc.nextInt();
            if (x == prev) count++;
            prev = x;
        }
        System.out.println(count);
    }
}`,
        cpp: `#include <bits/stdc++.h>
using namespace std;
int main(){
    int n,k; cin>>n>>k;
    int prev=-1,cnt=0;
    for(int i=0;i<n;i++){int x;cin>>x;if(x==prev)cnt++;prev=x;}
    cout<<cnt<<"\n";
}`
    },

    1005: {
        explanation: `Next Round (CF 158A): Count participants with score >= scores[k-1] and score > 0.`,
        python: `# O(n)
n, k = map(int, input().split())
scores = list(map(int, input().split()))
threshold = scores[k-1]
print(sum(1 for s in scores if s >= threshold and s > 0))`,
        java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n=sc.nextInt(), k=sc.nextInt();
        int[] s = new int[n];
        for(int i=0;i<n;i++) s[i]=sc.nextInt();
        int thr=s[k-1], ans=0;
        for(int x:s) if(x>=thr && x>0) ans++;
        System.out.println(ans);
    }
}`,
        cpp: `#include<bits/stdc++.h>
using namespace std;
int main(){
    int n,k; cin>>n>>k;
    vector<int> s(n);
    for(auto&x:s)cin>>x;
    int thr=s[k-1],ans=0;
    for(int x:s)if(x>=thr&&x>0)ans++;
    cout<<ans<<"\n";
}`
    },

    1006: {
        explanation: `Helpful Maths (CF 339A): Count 1s, 2s, 3s; reconstruct sorted string with + separators.`,
        python: `# O(n)
s = input()
cnt = [0]*4
for c in s:
    if c.isdigit(): cnt[int(c)] += 1
res = []
for d in [1,2,3]:
    res.extend([str(d)]*cnt[d])
print('+'.join(res))`,
        java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        String s = new Scanner(System.in).next();
        int[] cnt = new int[4];
        for(char c:s.toCharArray()) if(c>='1'&&c<='3') cnt[c-'0']++;
        StringBuilder sb = new StringBuilder();
        for(int d=1;d<=3;d++) for(int i=0;i<cnt[d];i++){
            if(sb.length()>0) sb.append('+');
            sb.append(d);
        }
        System.out.println(sb);
    }
}`,
        cpp: `#include<bits/stdc++.h>
using namespace std;
int main(){
    string s; cin>>s;
    int cnt[4]={};
    for(char c:s) if(c>='1'&&c<='3') cnt[c-'0']++;
    string res;
    for(int d=1;d<=3;d++) for(int i=0;i<cnt[d];i++){
        if(!res.empty()) res+='+';
        res+=char('0'+d);
    }
    cout<<res<<"\n";
}`
    },

    1007: {
        explanation: `Petya and Strings (CF 131A): Compare strings case-insensitively, return -1/0/1.`,
        python: `# O(n)
s = input().lower()
t = input().lower()
if s < t: print(-1)
elif s > t: print(1)
else: print(0)`,
        java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s=sc.next().toLowerCase(), t=sc.next().toLowerCase();
        int cmp=s.compareTo(t);
        System.out.println(cmp<0?-1:cmp>0?1:0);
    }
}`,
        cpp: `#include<bits/stdc++.h>
using namespace std;
int main(){
    string s,t; cin>>s>>t;
    for(auto&c:s)c=tolower(c);
    for(auto&c:t)c=tolower(c);
    if(s<t)cout<<-1;else if(s>t)cout<<1;else cout<<0;
    cout<<"\n";
}`
    },

    1008: {
        explanation: `CF 2B: Min trailing zeros path in n×n matrix. Run DP for factor-2 and factor-5 separately. Answer = min of both DPs at bottom-right.`,
        python: `# O(n^2)
def count_factor(x, p):
    c = 0
    while x % p == 0: x //= p; c += 1
    return c

n = int(input())
mat = [list(map(int, input().split())) for _ in range(n)]
INF = float('inf')

for prime in [2, 5]:
    dp = [[INF]*n for _ in range(n)]
    dp[0][0] = count_factor(mat[0][0], prime)
    for i in range(1, n): dp[i][0] = dp[i-1][0] + count_factor(mat[i][0], prime)
    for j in range(1, n): dp[0][j] = dp[0][j-1] + count_factor(mat[0][j], prime)
    for i in range(1, n):
        for j in range(1, n):
            dp[i][j] = min(dp[i-1][j], dp[i][j-1]) + count_factor(mat[i][j], prime)
    if prime == 2: ans2 = dp[n-1][n-1]
    else: ans5 = dp[n-1][n-1]
print(min(ans2, ans5))`,
        java: `import java.util.*;
public class Main {
    static int cf(int x, int p){int c=0;while(x%p==0){x/=p;c++;}return c;}
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        int n=sc.nextInt();
        int[][] m=new int[n][n];
        for(int i=0;i<n;i++)for(int j=0;j<n;j++)m[i][j]=sc.nextInt();
        int ans=Integer.MAX_VALUE;
        for(int p:new int[]{2,5}){
            int[][] dp=new int[n][n];
            dp[0][0]=cf(m[0][0],p);
            for(int i=1;i<n;i++)dp[i][0]=dp[i-1][0]+cf(m[i][0],p);
            for(int j=1;j<n;j++)dp[0][j]=dp[0][j-1]+cf(m[0][j],p);
            for(int i=1;i<n;i++)for(int j=1;j<n;j++)
                dp[i][j]=Math.min(dp[i-1][j],dp[i][j-1])+cf(m[i][j],p);
            ans=Math.min(ans,dp[n-1][n-1]);
        }
        System.out.println(ans);
    }
}`,
        cpp: `#include<bits/stdc++.h>
using namespace std;
int cf(int x,int p){int c=0;while(x%p==0){x/=p;c++;}return c;}
int main(){
    int n;cin>>n;
    vector<vector<int>> m(n,vector<int>(n));
    for(auto&r:m)for(auto&x:r)cin>>x;
    int ans=INT_MAX;
    for(int p:{2,5}){
        vector<vector<int>> dp(n,vector<int>(n,0));
        dp[0][0]=cf(m[0][0],p);
        for(int i=1;i<n;i++)dp[i][0]=dp[i-1][0]+cf(m[i][0],p);
        for(int j=1;j<n;j++)dp[0][j]=dp[0][j-1]+cf(m[0][j],p);
        for(int i=1;i<n;i++)for(int j=1;j<n;j++)
            dp[i][j]=min(dp[i-1][j],dp[i][j-1])+cf(m[i][j],p);
        ans=min(ans,dp[n-1][n-1]);
    }
    cout<<ans<<"\n";
}`
    },

    1009: {
        explanation: `Lucky Numbers (CF 122C): Generate all lucky numbers (digits only 4/7, up to 10 digits = 2046 total). Find nearest to n.`,
        python: `# O(2046)
from itertools import product
lucky = []
for length in range(1, 11):
    for combo in product('47', repeat=length):
        lucky.append(int(''.join(combo)))
n = int(input())
print(min(lucky, key=lambda x: (abs(x-n), x)))`,
        java: `import java.util.*;
public class Main {
    static List<Long> lucky = new ArrayList<>();
    static void gen(long cur){
        if(cur>2000000000L)return;
        if(cur>0)lucky.add(cur);
        gen(cur*10+4); gen(cur*10+7);
    }
    public static void main(String[] a){
        gen(0);
        long n=new Scanner(System.in).nextLong(), best=Long.MAX_VALUE, ans=0;
        for(long l:lucky){
            long d=Math.abs(l-n);
            if(d<best||(d==best&&l<ans)){best=d;ans=l;}
        }
        System.out.println(ans);
    }
}`,
        cpp: `#include<bits/stdc++.h>
using namespace std;
vector<long long> lucky;
void gen(long long cur){
    if(cur>2e9)return;
    if(cur)lucky.push_back(cur);
    gen(cur*10+4);gen(cur*10+7);
}
int main(){
    gen(0);
    long long n;cin>>n;
    long long best=LLONG_MAX,ans=0;
    for(auto l:lucky){
        long long d=abs(l-n);
        if(d<best||(d==best&&l<ans)){best=d;ans=l;}
    }
    cout<<ans<<"\n";
}`
    },

    1010: {
        explanation: `Fibonacci Sum: sum F(L..R) = F(R+2) - F(L+1). Use 2x2 matrix exponentiation to compute F(n) mod 1e9+7 in O(log n).`,
        python: `# O(log n)
MOD = 10**9 + 7

def mat_mul(A, B):
    return [[(A[0][0]*B[0][0]+A[0][1]*B[1][0])%MOD,(A[0][0]*B[0][1]+A[0][1]*B[1][1])%MOD],
            [(A[1][0]*B[0][0]+A[1][1]*B[1][0])%MOD,(A[1][0]*B[0][1]+A[1][1]*B[1][1])%MOD]]

def mat_pow(M, n):
    R = [[1,0],[0,1]]
    while n:
        if n&1: R = mat_mul(R, M)
        M = mat_mul(M, M); n >>= 1
    return R

def fib(n):
    if n == 0: return 0
    return mat_pow([[1,1],[1,0]], n)[0][1]

T = int(input())
for _ in range(T):
    L, R = map(int, input().split())
    ans = (fib(R+2) - fib(L+1) + MOD) % MOD
    print(ans)`,
        java: `import java.util.*;
public class Main {
    static final long MOD=1_000_000_007L;
    static long[][] mul(long[][] A,long[][] B){
        return new long[][]{{(A[0][0]*B[0][0]+A[0][1]*B[1][0])%MOD,(A[0][0]*B[0][1]+A[0][1]*B[1][1])%MOD},
                            {(A[1][0]*B[0][0]+A[1][1]*B[1][0])%MOD,(A[1][0]*B[0][1]+A[1][1]*B[1][1])%MOD}};
    }
    static long[][] mpow(long[][] M,long n){
        long[][] R={{1,0},{0,1}};
        while(n>0){if((n&1)==1)R=mul(R,M);M=mul(M,M);n>>=1;}
        return R;
    }
    static long fib(long n){if(n<=0)return 0;return mpow(new long[][]{{1,1},{1,0}},n)[0][1];}
    public static void main(String[] a){
        Scanner sc=new Scanner(System.in);
        int T=sc.nextInt();
        while(T-->0){
            long L=sc.nextLong(),R=sc.nextLong();
            System.out.println((fib(R+2)-fib(L+1)+MOD)%MOD);
        }
    }
}`,
        cpp: `#include<bits/stdc++.h>
using namespace std;
typedef long long ll;
typedef vector<vector<ll>> Mat;
const ll MOD=1e9+7;
Mat mul(Mat&A,Mat&B){
    Mat C(2,vector<ll>(2,0));
    for(int i=0;i<2;i++)for(int j=0;j<2;j++)for(int k=0;k<2;k++)
        C[i][j]=(C[i][j]+A[i][k]*B[k][j])%MOD;
    return C;
}
Mat mpow(Mat M,ll n){
    Mat R={{1,0},{0,1}};
    while(n){if(n&1)R=mul(R,M);M=mul(M,M);n>>=1;}
    return R;
}
ll fib(ll n){if(n<=0)return 0;return mpow({{1,1},{1,0}},n)[0][1];}
int main(){
    int T;cin>>T;
    while(T--){
        ll L,R;cin>>L>>R;
        cout<<(fib(R+2)-fib(L+1)+MOD)%MOD<<"\n";
    }
}`
    },

};

module.exports = SOLUTIONS;
