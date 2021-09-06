[![CD/Deploy to AWS](https://github.com/fabidick22/github-devops/actions/workflows/aws-deploy.yml/badge.svg)](https://github.com/fabidick22/github-devops/actions/workflows/aws-deploy.yml)
[![CI/Build Artefact](https://github.com/fabidick22/github-devops/actions/workflows/continuous-integration.yml/badge.svg)](https://github.com/fabidick22/github-devops/actions/workflows/continuous-integration.yml)
[![CI/Code Analysis](https://github.com/fabidick22/github-devops/actions/workflows/code-analysis.yml/badge.svg)](https://github.com/fabidick22/github-devops/actions/workflows/code-analysis.yml)
# github-devops
Github flow implementation

## Features
- Scan code for secrets before being sent to the main branch.
- Scan vulnerable code dependencies
- Continuous code quality with SonarCloud
- Automated semantic release
- Status notifications in Slack
- Deploy infrastructure with AWS SAM (IaC)

## TODO
- Multiple environment support
- Blue/Green deployment

## CI/CD Pipeline
![DevOps Pipeline](https://raw.githubusercontent.com/fabidick22/github-devops/main/.docs/images/Github-Flow.png)