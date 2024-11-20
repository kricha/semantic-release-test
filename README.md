# **Semantic Release**

## **Conventional Commits**

- **What is it?**  
  [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary) is a specification for writing meaningful and structured commit messages.
- **How does it work?**  
  [Semantic Release](https://github.com/semantic-release/semantic-release#how-does-it-work) automates the versioning and release process based on Conventional Commits.

- **Suggested Preset:**  
  It is recommended to start with the [Conventional Changelog Preset](https://github.com/conventional-changelog/conventional-changelog-config-spec/blob/master/versions/2.2.0/README.md) for consistency.

---

## **Workflow Overview**

### **Branches**

- **`main` branch:** Contains deployable code only.
- **`dev` branch:** Contains ongoing development code.
- **`release` branch:** Contains code planned for deployment (to be merged into `main`).
- **`hotfix/*` branches:** Contain urgent fixes for the `main` branch. Merging into `main` triggers a new release.
- **`(fix/feature/task)/*` branches:** Contain changes for specific features, tasks, or fixes.

---

### **Flow**

1. **Main (`main`):**

   - Houses production-ready code.
   - Accepts pull requests (PRs) from `release` and `hotfix/*` branches.
   - After a PR is closed:
     - Automatically triggers the release workflow.
     - Runs fully automated jobs, followed by a manual review by the deploy manager for the final `deploy` job.
     - The last job creates a **tag**, prepares **release notes**, updates the **changelog**, and **releases the required components**.
     - Post-release, the `dev` branch is automatically rebased onto `main`.

2. **Release (`release`):**

   - Created from `dev` to prepare a deployable candidate.
   - PRs from `release` to `main` must be completed with **merge** or **rebase and merge**. (Consider using "rebase and merge" if you want a cleaner history without merge commits.)

3. **Hotfix (`hotfix/*`):**

   - Created from `main` for urgent production fixes.
   - PRs from `hotfix/*` to `main` must use **squash commits**.
   - The **squash commit title** must adhere to the Conventional Commits specification.

4. **Development (`dev`):**

   - Contains ongoing development.
   - Each commit triggers a **development deployment**.

5. **Feature/Task/Fix (`(fix/feature/task)/*`):**
   - Created to implement features, tasks, or bug fixes.
   - PRs from these branches into `dev` must use **squash commits**.
   - The **squash commit title** must adhere to the Conventional Commits specification.

---

## **Git Hooks**

To enforce consistent commit messages and streamline the workflow:

- Use the following command to enable hooks:
  ```bash
  git config core.hooksPath .githooks
  ```
