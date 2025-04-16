
const { spawn } = require('child_process');
const path = require('path');

// Colors for output
const colors = {
  frontend: '\x1b[36m', // Cyan
  backend: '\x1b[32m',  // Green
  reset: '\x1b[0m'      // Reset
};

// Start frontend
const frontend = spawn('npm', ['run', 'dev'], {
  cwd: path.resolve(__dirname),
  shell: true,
  stdio: 'pipe'
});

// Start backend
const backend = spawn('npm', ['run', 'dev'], {
  cwd: path.resolve(__dirname, 'backend'),
  shell: true,
  stdio: 'pipe'
});

// Handle frontend output
frontend.stdout.on('data', (data) => {
  console.log(`${colors.frontend}[FRONTEND] ${data.toString().trim()}${colors.reset}`);
});

frontend.stderr.on('data', (data) => {
  console.error(`${colors.frontend}[FRONTEND ERROR] ${data.toString().trim()}${colors.reset}`);
});

// Handle backend output
backend.stdout.on('data', (data) => {
  console.log(`${colors.backend}[BACKEND] ${data.toString().trim()}${colors.reset}`);
});

backend.stderr.on('data', (data) => {
  console.error(`${colors.backend}[BACKEND ERROR] ${data.toString().trim()}${colors.reset}`);
});

// Handle process exit
process.on('SIGINT', () => {
  console.log('\nStopping all processes...');
  frontend.kill();
  backend.kill();
  process.exit(0);
});

// Log startup message
console.log(`${colors.frontend}Starting frontend server...${colors.reset}`);
console.log(`${colors.backend}Starting backend server...${colors.reset}`);
console.log('Press Ctrl+C to stop all servers');
