/*
Check If N and Its Double Exist

Given an array arr of integers, check if there exist two indices i and j such that :

- i != j
- 0 <= i, j < arr.length
- arr[i] == 2 * arr[j]
 

Example 1:

Input: arr = [10,2,5,3]
Output: true
Explanation: For i = 0 and j = 2, arr[i] == 10 == 2 * 5 == 2 * arr[j]
Example 2:

Input: arr = [3,1,7,11]
Output: false
Explanation: There is no i and j that satisfy the conditions.
 

Constraints:

- 2 <= arr.length <= 500
- -10<sup>3</sup> <= arr[i] <= 10<sup>3</sup>

*/

function checkIfExist(arr) {
    // Create a set to store elements we've already seen
    const seen = new Set();

    for (let i = 0; i < arr.length; i++) {
        const current = arr[i];

        // Check if we have already seen 2 * current or current / 2
        if (seen.has(2 * current) || (current % 2 === 0 && seen.has(current / 2))) {
            return true;
        }

        // Add the current element to the set
        seen.add(current);
    }

    // If no valid i, j pair is found
    return false;
}

// Example 1:
console.log(checkIfExist([10, 2, 5, 3])); // Output: true

// Example 2:
console.log(checkIfExist([3, 1, 7, 11])); // Output: false
