import React from 'react';
import { Form, Checkbox } from 'antd';

/**
 * 日期输入框
 */
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
class CheckboxInput extends React.Component {
  render() {
    const {form, item, formItemLayout} = this.props;
    const { getFieldDecorator } = form;
    const handleInputType = () => {
      return <CheckboxGroup options={item.options || []} />;
    };
    return (
      <FormItem
        {...formItemLayout}
        label={item.name}
      >
        {getFieldDecorator(item.mapKey, {
          rules: [{ required: item.required, message: item.message }],
          initialValue: item.value || null
        })(handleInputType())}
      </FormItem>
    );
  }
}
export default CheckboxInput;
