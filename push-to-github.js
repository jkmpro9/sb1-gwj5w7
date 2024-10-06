import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const GITHUB_TOKEN = 'YOUR_GITHUB_TOKEN';
const REPO_NAME = 'invoice-generator-app';
const GITHUB_USERNAME = 'YOUR_GITHUB_USERNAME';

// Function to make API requests
function makeRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => resolve(JSON.parse(body)));
    });
    req.on('error', (error) => reject(error));
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

// Create a new repository
async function createRepo() {
  const options = {
    hostname: 'api.github.com',
    path: '/user/repos',
    method: 'POST',
    headers: {
      'Authorization': `token ${GITHUB_TOKEN}`,
      'User-Agent': 'Node.js',
      'Content-Type': 'application/json'
    }
  };
  const data = { name: REPO_NAME, private: false };
  await makeRequest(options, data);
  console.log(`Repository ${REPO_NAME} created successfully.`);
}

// Function to upload a file to the repository
async function uploadFile(filePath, content) {
  const options = {
    hostname: 'api.github.com',
    path: `/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents/${filePath}`,
    method: 'PUT',
    headers: {
      'Authorization': `token ${GITHUB_TOKEN}`,
      'User-Agent': 'Node.js',
      'Content-Type': 'application/json'
    }
  };
  const data = {
    message: `Add ${filePath}`,
    content: Buffer.from(content).toString('base64')
  };
  await makeRequest(options, data);
  console.log(`Uploaded ${filePath}`);
}

// Function to recursively read and upload directory contents
async function uploadDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const relativePath = path.relative(process.cwd(), filePath);
    if (fs.statSync(filePath).isDirectory()) {
      await uploadDirectory(filePath);
    } else {
      const content = fs.readFileSync(filePath, 'utf8');
      await uploadFile(relativePath, content);
    }
  }
}

// Main function to push the project to GitHub
async function pushToGitHub() {
  try {
    await createRepo();
    await uploadDirectory('.');
    console.log('Project successfully pushed to GitHub!');
  } catch (error) {
    console.error('Error pushing to GitHub:', error.message);
  }
}

pushToGitHub();