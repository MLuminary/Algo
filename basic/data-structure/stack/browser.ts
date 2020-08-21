import { ChainStack } from './stack'

/**
 * 用两个栈结构模拟浏览器 History 的前进后退
 */
class BrowserHistory<T> {
  private backStack: ChainStack<T>
  private forwardStack: ChainStack<T>
  private currentUrl: T
  constructor(currentUrl: T) {
    this.backStack = new ChainStack<T>()
    this.forwardStack = new ChainStack<T>()
    this.currentUrl = currentUrl
  }

  back() {
    if (this.backStack.size <= 0) {
      return
    }
    this.forwardStack.push(this.currentUrl)
    this.currentUrl = this.backStack.pop()!
  }

  forward() {
    if (this.forwardStack.size <= 0) {
      return
    }
    this.backStack.push(this.currentUrl)
    this.currentUrl = this.forwardStack.pop()!
  }

  linkUrl(url: T) {
    this.currentUrl && this.backStack.push(this.currentUrl)
    this.currentUrl = url
  }

  getCurrentPage() {
    return this.currentUrl
  }
}

const browser = new BrowserHistory<string>('www.baidu.com')
browser.linkUrl('www.zhanghaoqin.com')
browser.linkUrl('www.github.com')
console.log(browser.getCurrentPage())
browser.back()
console.log(browser.getCurrentPage())
browser.back()
console.log(browser.getCurrentPage())
browser.forward()
console.log(browser.getCurrentPage())
browser.forward()
console.log(browser.getCurrentPage())
