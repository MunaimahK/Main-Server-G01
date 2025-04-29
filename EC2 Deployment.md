1. Ubuntu t2.micro EC2 Launch
2. Install, enable, and start docker on EC2: 
`sudo apt-get update && sudo apt-get install docker.io -y && sudo systemctl start docker && sudo chmod 666 /var/run/docker.sock && sudo systemctl enable docker && docker --version`
Need to configure runner on each repository (for frontend and backend) - typically frontend and backend written separately.
3. Go to GitHub Actions, select new self-hosted runner (Linux) and create two runners: one for node and one for
mkdir node-runner && cd node-runner
curl -o actions-runner-linux-x64-2.323.0.tar.gz -L https://github.com/actions/runner/releases/download/v2.323.0/actions-runner-linux-x64-2.323.0.tar.gz