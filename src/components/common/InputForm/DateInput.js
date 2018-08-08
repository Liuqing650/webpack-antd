import React from 'react';
import { Form, DatePicker } from 'antd';

/**
 * 日期输入框
 */
const FormItem = Form.Item;
class DateInput extends React.Component {
  render() {
    const {form, item, formItemLayout} = this.props;
    const { getFieldDecorator } = form;
    const handleInputType = () => {
      return <DatePicker placeholder={item.placeholder || '请输入日期'} showTime format={item.format || 'YYYY-MM-DD HH:mm:ss'} />;
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
export default DateInput;
