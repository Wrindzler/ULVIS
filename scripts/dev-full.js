const { spawn } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const readline = require('node:readline');

const rootDir = path.resolve(__dirname, '..');

const projects = [
  {
    name: 'backend',
    cwd: path.join(rootDir, 'kaynak-kodlar', 'backend'),
  },
  {
    name: 'frontend',
    cwd: path.join(rootDir, 'kaynak-kodlar', 'frontend'),
  },
];

let shuttingDown = false;
const children = [];

function prefixLines(name, stream, write) {
  const rl = readline.createInterface({ input: stream });
  rl.on('line', (line) => write(`[${name}] ${line}\n`));
}

function runCommand(name, command, cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, {
      cwd,
      env: process.env,
      shell: true,
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    prefixLines(name, child.stdout, (line) => process.stdout.write(line));
    prefixLines(name, child.stderr, (line) => process.stderr.write(line));

    child.on('error', reject);
    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${name} exited with code ${code}`));
      }
    });
  });
}

async function ensureDependencies(project) {
  const nodeModulesPath = path.join(project.cwd, 'node_modules');
  if (fs.existsSync(nodeModulesPath)) {
    return;
  }

  console.log(`[${project.name}] node_modules bulunamadi, npm install calisiyor...`);
  await runCommand(project.name, 'npm install', project.cwd);
}

function startDevServer(project) {
  const child = spawn('npm run dev', {
    cwd: project.cwd,
    env: process.env,
    shell: true,
    stdio: ['inherit', 'pipe', 'pipe'],
  });

  children.push(child);
  prefixLines(project.name, child.stdout, (line) => process.stdout.write(line));
  prefixLines(project.name, child.stderr, (line) => process.stderr.write(line));

  child.on('error', (error) => {
    console.error(`[${project.name}] ${error.message}`);
    shutdown(1);
  });

  child.on('close', (code) => {
    if (!shuttingDown) {
      console.error(`[${project.name}] dev sunucusu kapandi.`);
      shutdown(code || 1);
    }
  });
}

function shutdown(code = 0) {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;
  for (const child of children) {
    if (!child.killed) {
      child.kill('SIGTERM');
    }
  }

  setTimeout(() => process.exit(code), 300);
}

async function main() {
  for (const project of projects) {
    if (!fs.existsSync(path.join(project.cwd, 'package.json'))) {
      throw new Error(`${project.name} package.json bulunamadi: ${project.cwd}`);
    }
  }

  await Promise.all(projects.map(ensureDependencies));
  projects.forEach(startDevServer);

  process.on('SIGINT', () => shutdown(0));
  process.on('SIGTERM', () => shutdown(0));
}

main().catch((error) => {
  console.error(`[dev:full] ${error.message}`);
  process.exit(1);
});
