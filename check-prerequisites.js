#!/usr/bin/env node

/**
 * Prerequisites Checker for Medical Document Portal
 * Run: node check-prerequisites.js
 */

const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkVersion(version, minVersion) {
  const v1 = version.split('.').map(Number);
  const v2 = minVersion.split('.').map(Number);
  
  for (let i = 0; i < Math.max(v1.length, v2.length); i++) {
    const num1 = v1[i] || 0;
    const num2 = v2[i] || 0;
    if (num1 > num2) return true;
    if (num1 < num2) return false;
  }
  return true;
}

async function checkNodeVersion() {
  try {
    const { stdout } = await execPromise('node --version');
    const version = stdout.trim().replace('v', '');
    const minVersion = '16.0.0';
    
    if (checkVersion(version, minVersion)) {
      log(`✓ Node.js: v${version} (>= ${minVersion} required)`, 'green');
      return true;
    } else {
      log(`✗ Node.js: v${version} (>= ${minVersion} required)`, 'red');
      log(`  Please update Node.js: https://nodejs.org/`, 'yellow');
      return false;
    }
  } catch (error) {
    log('✗ Node.js: Not installed', 'red');
    log('  Install from: https://nodejs.org/', 'yellow');
    return false;
  }
}

async function checkNpmVersion() {
  try {
    const { stdout } = await execPromise('npm --version');
    const version = stdout.trim();
    const minVersion = '8.0.0';
    
    if (checkVersion(version, minVersion)) {
      log(`✓ npm: v${version} (>= ${minVersion} required)`, 'green');
      return true;
    } else {
      log(`✗ npm: v${version} (>= ${minVersion} required)`, 'red');
      log(`  Please update npm: npm install -g npm@latest`, 'yellow');
      return false;
    }
  } catch (error) {
    log('✗ npm: Not installed', 'red');
    return false;
  }
}

async function checkMySQLVersion() {
  try {
    const { stdout } = await execPromise('mysql --version');
    const match = stdout.match(/(\d+\.\d+\.\d+)/);
    if (match) {
      const version = match[1];
      log(`✓ MySQL: v${version}`, 'green');
      return true;
    } else {
      log('✗ MySQL: Version could not be determined', 'yellow');
      return false;
    }
  } catch (error) {
    log('✗ MySQL: Not installed or not in PATH', 'red');
    log('  Download from: https://dev.mysql.com/downloads/', 'yellow');
    return false;
  }
}

async function checkGit() {
  try {
    const { stdout } = await execPromise('git --version');
    const match = stdout.match(/(\d+\.\d+\.\d+)/);
    if (match) {
      const version = match[1];
      log(`✓ Git: v${version}`, 'green');
      return true;
    }
  } catch (error) {
    log('✗ Git: Not installed (optional)', 'yellow');
    log('  Download from: https://git-scm.com/', 'yellow');
    return false;
  }
}

async function checkPorts() {
  const net = require('net');
  
  const checkPort = (port) => {
    return new Promise((resolve) => {
      const server = net.createServer();
      
      server.once('error', (err) => {
        if (err.code === 'EADDRINUSE') {
          resolve(false);
        } else {
          resolve(true);
        }
      });
      
      server.once('listening', () => {
        server.close();
        resolve(true);
      });
      
      server.listen(port);
    });
  };
  
  const port3000 = await checkPort(3000);
  const port5000 = await checkPort(5000);
  
  if (port3000) {
    log('✓ Port 3000: Available (Frontend)', 'green');
  } else {
    log('✗ Port 3000: In use (Frontend)', 'yellow');
    log('  Frontend may fail to start. Stop any process using port 3000.', 'yellow');
  }
  
  if (port5000) {
    log('✓ Port 5000: Available (Backend)', 'green');
  } else {
    log('✗ Port 5000: In use (Backend)', 'yellow');
    log('  Backend may fail to start. Stop any process using port 5000.', 'yellow');
  }
  
  return port3000 && port5000;
}

async function main() {
  log('\n========================================', 'cyan');
  log('  Medical Document Portal', 'cyan');
  log('  Prerequisites Checker', 'cyan');
  log('========================================\n', 'cyan');
  
  log('Checking system requirements...\n', 'blue');
  
  const results = [];
  
  results.push(await checkNodeVersion());
  results.push(await checkNpmVersion());
  results.push(await checkMySQLVersion());
  await checkGit(); // Optional, don't count in results
  
  log('\nChecking port availability...\n', 'blue');
  await checkPorts();
  
  const allPassed = results.every(r => r);
  
  log('\n========================================', 'cyan');
  if (allPassed) {
    log('✓ All required dependencies are installed!', 'green');
    log('\nNext steps:', 'blue');
    log('1. Setup MySQL database (see README.md)', 'reset');
    log('2. Configure Backend/.env file', 'reset');
    log('3. Run: cd Backend && npm install && npm run migrate', 'reset');
    log('4. Run: cd Frontend && npm install', 'reset');
    log('5. Start both servers (see QUICKSTART.md)', 'reset');
  } else {
    log('✗ Some required dependencies are missing', 'red');
    log('\nPlease install the missing dependencies and run this check again.', 'yellow');
  }
  log('========================================\n', 'cyan');
}

main().catch(error => {
  log('Error running checks:', 'red');
  console.error(error);
  process.exit(1);
});

