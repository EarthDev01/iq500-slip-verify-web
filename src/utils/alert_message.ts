import { message } from 'ant-design-vue'

// Default style configuration for error messages
const defaultErrorStyle = {
  position: 'absolute',
  right: '0',
  top: '0',
}

// Default class for error messages
const defaultErrorClass = 'custom-class'

/**
 * Show error message with default styling
 * @param content - The error message content
 * @param options - Additional options to override defaults
 */
export const showError = (content: string | (() => string), options?: any) => {
  return message.error({
    content,
    class: defaultErrorClass,
    style: defaultErrorStyle,
    ...options, // Allow overriding default options
  })
}

/**
 * Show success message with default styling
 * @param content - The success message content
 * @param options - Additional options to override defaults
 */
export const showSuccess = (content: string | (() => string), options?: any) => {
  return message.success({
    content,
    class: defaultErrorClass,
    style: defaultErrorStyle,
    ...options,
  })
}

/**
 * Show info message with default styling
 * @param content - The info message content
 * @param options - Additional options to override defaults
 */
export const showInfo = (content: string | (() => string), options?: any) => {
  return message.info({
    content,
    class: defaultErrorClass,
    style: defaultErrorStyle,
    ...options,
  })
}

/**
 * Show warning message with default styling
 * @param content - The warning message content
 * @param options - Additional options to override defaults
 */
export const showWarning = (content: string | (() => string), options?: any) => {
  return message.warning({
    content,
    class: defaultErrorClass,
    style: defaultErrorStyle,
    ...options,
  })
}

