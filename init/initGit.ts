import { join } from 'path'
import chalk from 'chalk'
import { execSync } from 'child_process'
import { getLang } from './common'

export default async function initGit(
  author: string,
  email: string,
  remote: string,
  branch: string,
  firstCommitMsg: string,
  isPush: boolean
): Promise<boolean> {
  let isFinish = true
  const resultMsg: string[] = []
  const errMsg: string[] = []

  const commands = [`git init "${join(__dirname, '..')}"`, `git add .gitignore`]

  if (author !== '') {
    commands.push(`git config --local user.name "${author}"`)
  }

  if (email !== '') {
    commands.push(`git config --local user.email "${email}"`)
  }

  if (firstCommitMsg !== '') {
    commands.push(`git commit -m "${firstCommitMsg}"`)
  } else {
    commands.push(`git commit -m "no message"`)
  }

  if (branch !== '') {
    commands.push(`git branch -M "${branch}"`)
  }

  if (remote != null && remote.length > 0) {
    commands.push(`git remote add origin "${remote}"`)

    if (isPush) {
      commands.push(`git push -u origin ${branch}`)
    }
  }

  try {
    for (const c of commands) {
      const gitInitOutput = execSync(c).toString()
      if (gitInitOutput !== '') {
        resultMsg.push(gitInitOutput)
      }
    }
  } catch (err: any) {
    errMsg.push(err.message)
  }

  if (resultMsg.length !== 0) {
    console.group(chalk.underline(getLang(19)))
    console.log(chalk.green(resultMsg.join('\n')))
    console.groupEnd()
  }

  if (errMsg.length !== 0) {
    console.group(chalk.underline.red(getLang(20)))
    console.log(errMsg.join('\n'))
    console.groupEnd()
    isFinish = false
  }

  return isFinish
}
