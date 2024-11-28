/*
Minimum Obstacle Removal to Reach Corner

You are given a 0-indexed 2D integer array grid of size m x n. Each cell has one of two values:

- 0 represents an empty cell,
- 1 represents an obstacle that may be removed.

You can move up, down, left, or right from and to an empty cell.

Return the minimum number of obstacles to remove so you can move from the upper left corner (0, 0) to the lower right corner (m - 1, n - 1).

<img src="images/example1drawio-1.png">

Input: grid = [[0,1,1],[1,1,0],[1,1,0]]
Output: 2
Explanation: We can remove the obstacles at (0, 1) and (0, 2) to create a path from (0, 0) to (2, 2).
It can be shown that we need to remove at least 2 obstacles, so we return 2.
Note that there may be other ways to remove 2 obstacles to create a path.

Example 2:

<img src="images/example1drawio.png">

Input: grid = [[0,1,0,0,0],[0,1,0,1,0],[0,0,0,1,0]]
Output: 0
Explanation: We can move from (0, 0) to (2, 4) without removing any obstacles, so we return 0.
 

Constraints:

- m == grid.length
- n == grid[i].length
- 1 <= m, n <= 105
- 2 <= m * n <= 105
- grid[i][j] is either 0 or 1.
- grid[0][0] == grid[m - 1][n - 1] == 0
*/

class MinHeap {
    constructor() {
        this.heap = [];
    }

    push([x, y, cost]) {
        this.heap.push([x, y, cost]);
        this.bubbleUp();
    }

    pop() {
        if (this.size() === 1) return this.heap.pop();
        const top = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown();
        return top;
    }

    size() {
        return this.heap.length;
    }

    bubbleUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            const parent = Math.floor((index - 1) / 2);
            if (this.heap[parent][2] <= this.heap[index][2]) break;
            [this.heap[parent], this.heap[index]] = [this.heap[index], this.heap[parent]];
            index = parent;
        }
    }

    bubbleDown() {
        let index = 0;
        const length = this.heap.length;
        while (true) {
            let left = 2 * index + 1;
            let right = 2 * index + 2;
            let smallest = index;

            if (left < length && this.heap[left][2] < this.heap[smallest][2]) smallest = left;
            if (right < length && this.heap[right][2] < this.heap[smallest][2]) smallest = right;
            if (smallest === index) break;

            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            index = smallest;
        }
    }
}

var minimumObstacles = function(grid) {
    const m = grid.length, n = grid[0].length;
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    const visited = Array.from({ length: m }, () => Array(n).fill(false));
    const pq = new MinHeap();

    // Start at (0, 0) with cost 0
    pq.push([0, 0, 0]);

    while (pq.size() > 0) {
        const [x, y, cost] = pq.pop();

        // If we reach the bottom-right corner, return the cost
        if (x === m - 1 && y === n - 1) return cost;

        // Skip if already visited
        if (visited[x][y]) continue;
        visited[x][y] = true;

        // Explore neighbors
        for (const [dx, dy] of directions) {
            const nx = x + dx, ny = y + dy;
            if (nx >= 0 && nx < m && ny >= 0 && ny < n && !visited[nx][ny]) {
                // Add neighbors to the priority queue
                pq.push([nx, ny, cost + grid[nx][ny]]);
            }
        }
    }

    return -1; // No path found (shouldn't happen with valid input)
};
