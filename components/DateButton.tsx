import DateTimePicker from '@react-native-community/datetimepicker';

export const DateButton = ({ date, setDate }) => {

  const onChange = (event, selectedDate) => {
    const newDate = selectedDate;
    setDate(new Date(newDate));
  };

  return (
    <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode='date'
        onChange={onChange}
        accentColor='#BCACFB'
    />
  );
}
