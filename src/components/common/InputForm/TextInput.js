import React from 'react';
import { Form, Input } from 'antd';

/**
 * 单行或多行文本输入框
 */
const FormItem = Form.Item;
class TextInput extends React.Component {
  render() {
    const {form, item, formItemLayout} = this.props;
    const { getFieldDecorator } = form;
    const { TextArea } = Input;
    const handleInputType = () => {
      if (['textArea', 'textarea'].includes(item.inputType)) {
        return <TextArea rows={item.rows || 4} placeholder={item.placeholder || item.message || ''} />;
      }
      return <Input placeholder={item.placeholder || ''} />;
    };
    return (
      <FormItem
        {...formItemLayout}
        label={item.name}
      >
        {getFieldDecorator(item.mapKey, {
          rules: [{ required: item.required, message: item.message }],
          initialValue: item.value || ''
        })(handleInputType())}
      </FormItem>
    );
  }
}
export default TextInput;
