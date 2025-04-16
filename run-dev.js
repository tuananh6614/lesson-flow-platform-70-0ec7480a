
// Simple script to run both frontend and backend development servers
const { exec } = require('child_process');
const path = require('path');

console.log('Starting EPULearn Development Environment');
console.log('----------------------------------------');

// Start Backend
console.log('\x1b[32m%s\x1b[0m', 'Starting Backend Server...');
const backend = exec('npm run dev', { cwd: path.join(__dirname, 'backend') });

backend.stdout.on('data', (data) => {
  console.log('\x1b[32m%s\x1b[0m', '[BACKEND] ' + data.trim());
});

backend.stderr.on('data', (data) => {
  console.error('\x1b[31m%s\x1b[0m', '[BACKEND ERROR] ' + data.trim());
});

// Start Frontend
console.log('\x1b[36m%s\x1b[0m', 'Starting Frontend Server...');
const frontend = exec('npm run dev', { cwd: __dirname });

frontend.stdout.on('data', (data) => {
  console.log('\x1b[36m%s\x1b[0m', '[FRONTEND] ' + data.trim());
});

frontend.stderr.on('data', (data) => {
  console.error('\x1b[31m%s\x1b[0m', '[FRONTEND ERROR] ' + data.trim());
});

// Handle cleanup
process.on('SIGINT', () => {
  console.log('\n\x1b[33m%s\x1b[0m', 'Shutting down servers...');
  backend.kill();
  frontend.kill();
  process.exit(0);
});

console.log('\x1b[33m%s\x1b[0m', 'Press Ctrl+C to stop all servers');
