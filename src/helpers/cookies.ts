const cookie = {
  read(name: string): string | null {
    // ^ 匹配输入的开始
    // | 匹配 | 左右两边的表达式
    // \s* 匹配零个或多个空白字符
    // ; 匹配分号
    // ([^;]*) 匹配除了 ; 以外的任意字符
    const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'))
    return match ? decodeURIComponent(match[3]) : null
  }
}

export default cookie
