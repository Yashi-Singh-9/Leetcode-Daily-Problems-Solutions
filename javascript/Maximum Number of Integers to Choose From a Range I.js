/* 

Maximum Number of Integers to Choose From a Range I

You are given an integer array banned and two integers n and maxSum. You are choosing some number of integers following the below rules:

- The chosen integers have to be in the range [1, n].
- Each integer can be chosen at most once.
- The chosen integers should not be in the array banned.
- The sum of the chosen integers should not exceed maxSum.

Return the maximum number of integers you can choose following the mentioned rules. 

Example 1:

Input: banned = [1,6,5], n = 5, maxSum = 6
Output: 2
Explanation: You can choose the integers 2 and 4.
2 and 4 are from the range [1, 5], both did not appear in banned, and their sum is 6, which did not exceed maxSum.

Example 2:

Input: banned = [1,2,3,4,5,6,7], n = 8, maxSum = 1
Output: 0
Explanation: You cannot choose any integer while following the mentioned conditions.

Example 3:

Input: banned = [11], n = 7, maxSum = 50
Output: 7
Explanation: You can choose the integers 1, 2, 3, 4, 5, 6, and 7.
They are from the range [1, 7], all did not appear in banned, and their sum is 28, which did not exceed maxSum.
 

Constraints:

- 1 <= banned.length <= 10^4
- 1 <= banned[i], n <= 10^4
- 1 <= maxSum <= 10^9
*/

/**
 * @param {number[]} banned
 * @param {number} n
 * @param {number} maxSum
 * @return {number}
 */
function maxCount(banned, n, maxSum) {
    // Step 1: Create a set of banned numbers for quick lookup
    const bannedSet = new Set(banned);

    // Step 2: Initialize variables to keep track of the count and current sum
    let count = 0;
    let currentSum = 0;

    // Step 3: Iterate over numbers from 1 to n
    for (let i = 1; i <= n; i++) {
        // If the number is not banned and adding it does not exceed maxSum
        if (!bannedSet.has(i) && currentSum + i <= maxSum) {
            currentSum += i; // Add the number to the sum
            count++;         // Increment the count of chosen numbers
        }

        // If the current sum exceeds maxSum, break the loop early
        if (currentSum >= maxSum) {
            break;
        }
    }

    // Step 4: Return the count of chosen integers
    return count;
}

// Example Usage:
console.log(maxCount([1, 6, 5], 5, 6)); // Output: 2
console.log(maxCount([1, 2, 3, 4, 5, 6, 7], 8, 1)); // Output: 0
console.log(maxCount([11], 7, 50)); // Output: 7
