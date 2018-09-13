import React from 'react'

const Button = ({ children, ...props }) => <button {...props}>{children} (from components package)</button>

export default Button
