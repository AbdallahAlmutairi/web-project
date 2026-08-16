// Curated programming snippets for the "Developer/Coding Track".
// Snippets intentionally include braces, brackets, arrow functions,
// comparison/logical operators, semicolons, and indentation so the
// typing engine exercises symbols developers actually type.

export const snippets = {
  javascript: [
`function debounce(fn, delay) {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}`,
`const isValidUser = (user) => {
  if (!user || !user.name || user.age < 0) {
    return false;
  }
  return user.active === true && user.role !== "banned";
};`,
`const nums = [1, 2, 3, 4, 5];
const evens = nums.filter((n) => n % 2 === 0);
const total = evens.reduce((sum, n) => sum + n, 0);
console.log(total);`,
`class Stack {
  constructor() {
    this.items = [];
  }
  push(item) {
    this.items.push(item);
  }
  pop() {
    return this.items.length === 0 ? null : this.items.pop();
  }
}`,
  ],
  python: [
`def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(10))`,
`class Node:
    def __init__(self, value, next=None):
        self.value = value
        self.next = next

def print_list(head):
    while head is not None:
        print(head.value, end=" -> ")
        head = head.next`,
`def is_valid(user):
    if not user or user.get("age", 0) < 0:
        return False
    return user["active"] and user["role"] != "banned"`,
`nums = [1, 2, 3, 4, 5]
evens = [n for n in nums if n % 2 == 0]
total = sum(evens)
print(f"Total: {total}")`,
  ],
  cpp: [
`#include <iostream>
using namespace std;

int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

int main() {
    cout << factorial(5) << endl;
    return 0;
}`,
`struct Node {
    int value;
    Node* next;
};

void printList(Node* head) {
    while (head != nullptr) {
        cout << head->value << " -> ";
        head = head->next;
    }
}`,
`bool isValid(int age, bool active, string role) {
    if (age < 0 || !active) {
        return false;
    }
    return role != "banned" && age >= 18;
}`,
`#include <vector>
int sumEvens(std::vector<int>& nums) {
    int total = 0;
    for (int n : nums) {
        if (n % 2 == 0) total += n;
    }
    return total;
}`,
  ],
  html: [
`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Landing Page</title>
  </head>
  <body>
    <header class="hero">
      <h1>Welcome</h1>
    </header>
  </body>
</html>`,
`.card {
  display: flex;
  flex-direction: column;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  background-color: #1a1a1e;
}

.card:hover {
  transform: translateY(-2px);
}`,
`<nav class="navbar">
  <ul class="nav-links">
    <li><a href="#home">Home</a></li>
    <li><a href="#about">About</a></li>
  </ul>
</nav>`,
`@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
}`,
  ],
};

export const languageLabels = {
  javascript: "JavaScript",
  python: "Python",
  cpp: "C++",
  html: "HTML / CSS",
};

export const getRandomSnippet = (language = "javascript") => {
  const pool = snippets[language] || snippets.javascript;
  return pool[Math.floor(Math.random() * pool.length)];
};
