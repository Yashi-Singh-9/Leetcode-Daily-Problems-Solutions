/*
   Shortest Distance After Road Addition Queries I

   You are given an integer n and a 2D integer array queries.

There are n cities numbered from 0 to n - 1. Initially, there is a unidirectional road from city i to city i + 1 for all 0 <= i < n - 1.

queries[i] = [ui, vi] represents the addition of a new unidirectional road from city ui to city vi. After each query, you need to find the length of the shortest path from city 0 to city n - 1.

Return an array answer where for each i in the range [0, queries.length - 1], answer[i] is the length of the shortest path from city 0 to city n - 1 after processing the first i + 1 queries.

 

Example 1:

Input: n = 5, queries = [[2,4],[0,2],[0,4]]

Output: [3,2,1]

Explanation:

![Image 1](images/image8.jpg)

After the addition of the road from 2 to 4, the length of the shortest path from 0 to 4 is 3.

![Image 2](images/image9.jpg)

After the addition of the road from 0 to 2, the length of the shortest path from 0 to 4 is 2.

![Image 3](images/image10.jpg)

After the addition of the road from 0 to 4, the length of the shortest path from 0 to 4 is 1.

Example 2:

Input: n = 4, queries = [[0,3],[0,2]]

Output: [1,1]

Explanation:

![Image 4](images/image11.jpg)

After the addition of the road from 0 to 3, the length of the shortest path from 0 to 3 is 1.

![Image 5](images/image12.jpg)

After the addition of the road from 0 to 2, the length of the shortest path remains 1.

Constraints:

3 <= n <= 500
1 <= queries.length <= 500
queries[i].length == 2
0 <= queries[i][0] < queries[i][1] < n
1 < queries[i][1] - queries[i][0]
There are no repeated roads among the queries.
*/

function shortestDistanceAfterQueries(n, queries) {
    // Create adjacency list for the graph
    const graph = Array.from({ length: n }, () => []);

    // Initialize the graph with the default roads
    for (let i = 0; i < n - 1; i++) {
        graph[i].push(i + 1);
    }

    // Function to compute shortest path using BFS
    function bfs() {
        const queue = [[0, 0]]; // [current city, current distance]
        const visited = new Array(n).fill(false);
        visited[0] = true;

        while (queue.length > 0) {
            const [current, dist] = queue.shift();

            // If we reach the target city, return the distance
            if (current === n - 1) {
                return dist;
            }

            // Traverse neighbors
            for (const neighbor of graph[current]) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.push([neighbor, dist + 1]);
                }
            }
        }

        return Infinity; // If no path exists (this shouldn't happen with valid inputs)
    }

    const answer = [];

    // Process each query
    for (const [u, v] of queries) {
        // Add the new road to the graph
        graph[u].push(v);

        // Calculate the shortest path and add it to the answer
        answer.push(bfs());
    }

    return answer;
}

// Example usage
const n = 5;
const queries = [[2, 4], [0, 2], [0, 4]];
console.log(shortestDistanceAfterQueries(n, queries)); // Output: [3, 2, 1]
