
#!/bin/bash

# Font colors
CYAN='\033[0;36m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo -e "${CYAN}Starting EPULearn Full-Stack Application${NC}"
echo -e "${GREEN}Starting Backend Server...${NC}"
cd backend && npm run dev &
BACKEND_PID=$!

echo -e "${CYAN}Starting Frontend Server...${NC}"
cd .. && npm run dev &
FRONTEND_PID=$!

# Function to kill processes on exit
cleanup() {
  echo -e "\n${CYAN}Stopping servers...${NC}"
  kill $BACKEND_PID
  kill $FRONTEND_PID
  exit 0
}

# Trap Ctrl+C
trap cleanup INT

echo -e "${CYAN}Servers started successfully!${NC}"
echo -e "${CYAN}Frontend server running at${NC} http://localhost:5173"
echo -e "${GREEN}Backend server running at${NC} http://localhost:3001"
echo -e "Press Ctrl+C to stop all servers"

# Wait for processes to finish
wait
