# antigravity-workspace-awasome-skills
This repo is created to demo the usage of https://github.com/sickn33/antigravity-awesome-skills/tree/main inside Antigravity IDE

This repository appears to be a fork or a curated collection of the viral **Antigravity Awesome Skills** library, specifically tailored for managing and injecting specialized AI capabilities into agents like **Claude Code**, **Google Antigravity**, and **Cursor**.

Below is a comprehensive `README.md` template you can use.

-----

# 🌌 Antigravity Workspace Awesome Skills

[](https://www.google.com/search?q=https://github.com/shdhumale/antigravity-workspace-awasome-skills/blob/main/LICENSE)
[](https://github.com/sindresorhus/awesome)

A curated collection of over 250+ specialized skills and automated workflows for AI coding assistants. This repository helps you orchestrate workspaces and dynamically inject domain-specific knowledge into your AI agents (Claude Code, Antigravity, Cursor, etc.).

## 🚀 Overview

This vault transforms traditional AI prompting into **repeatable workflows**. Instead of writing long system prompts, you can "install" these skills to provide your agent with:

  - **Domain Expertise:** Architecture, Security, Data Engineering, etc.
  - **Repeatable Workflows:** TDD cycles, PR reviews, and automated refactoring.
  - **Specialized Tools:** Integration with MCP (Model Context Protocol) and CLI tools.

## ✨ Key Features

  - **🎯 Targeted Injection:** Only load the skills necessary for your specific project to save tokens and prevent "hallucination noise."
  - **🛠️ Smart Bundles:** Curated sets of skills for specific roles (Frontend Dev, DevOps, Security Auditor).
  - **🤖 Agent Compatibility:** Works seamlessly with Claude Code, Google Antigravity, and Cursor.
  - **🔄 Auto-Sync:** Integrated systems to keep your local skill library updated with the latest community improvements.

## 📦 Installation

### Prerequisites

  - Node.js installed
  - An AI Agent CLI (like `claude-code` or `antigravity`)

### Quick Start

```bash
# Clone the repository
git clone https://github.com/shdhumale/antigravity-workspace-awasome-skills.git

# Navigate to the directory
cd antigravity-workspace-awasome-skills

```

## 📂 Skill Categories

| Category | Description | Examples |
| :--- | :--- | :--- |
| **🏗️ Architecture** | Clean code, Microservices, ADR management | `@clean-code`, `@api-design` |
| **🔒 Security** | Pentesting, Security audits, WCAG compliance | `@security-audit`, `@owasp-top-10` |
| **🚀 DevOps** | CI/CD, Docker, Kubernetes, Terraform | `@github-actions`, `@docker-expert` |
| **🧪 Testing** | TDD, Playwright, E2E Testing | `@tdd-workflow`, `@playwright-skill` |
| **🤖 AI/ML** | Prompt Engineering, RAG, Agent evaluation | `@rag-implementation`, `@agent-eval` |

## 🛠️ Usage

To activate a skill within your workspace, place the skill definition in your local config directory (e.g., `./.agent/skills/` or `./skill-config/`).

**Example: Activating a "Code Review" skill**

1.  Locate `@code-reviewer` in the `/skills` folder.
2.  Link or copy it to your project's skill directory.
3.  Your agent will now automatically use this context when you ask: *"Review this pull request for performance issues."*

## 🍱 Popular Bundles

  * **The "Web Wizard" Pack:** React patterns, Tailwind mastery, and SEO audits.
  * **The "Data Engineer" Pack:** Airflow DAGs, DBT transformations, and Vector DB optimization.
  * **The "Security Pro" Pack:** SAST configuration and security-hardening patterns.

## 🤝 Contributing

Contributions are welcome\! If you have a specialized workflow or skill:

1.  Fork the repo.
2.  Create your skill in a new directory under `/skills`.
3.  Ensure you include a `SKILL.md` or configuration file describing the triggers.
4.  Submit a Pull Request.

## 📜 License

Distributed under the **MIT License**. See `LICENSE` for more information.

-----

*Created with ❤️ for the AI Developer Community.*
