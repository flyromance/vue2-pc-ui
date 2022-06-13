const Button = {
  name: 'FButton',
  render() {
    return <div>{this.$slots.default}</div>
  }
}

export default Button
