import { useEffect, useRef, useState } from 'react';
import { TimeInput, DatePickerInput } from '@mantine/dates';
import { IconCalendar, IconClock } from '@tabler/icons-react';
import { ActionIcon, rem } from '@mantine/core';
import dayjs from 'dayjs';
import S from './DateTimeInput.module.scss';
import plusIcon from '../../../images/add-plus-button.svg';
import minusIcon from '../../../images/delete-minus-button.svg';
import Image from 'next/image';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
interface DateTimeInputProps {
  setValue: any;
  getValues: any;
  id?: string;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl>;
  message?: string | FieldError | Merge<FieldError, FieldErrorsImpl>;
}

type DateTimeType = {
  selectDate: Date | null;
  startTime: string;
  endTime: string;
  date: string;
};

export default function DateTimeInput({ setValue, id, error, message }: DateTimeInputProps) {
  const [dateTime, setDateTime] = useState<DateTimeType>({
    selectDate: null as Date | null,
    startTime: '',
    endTime: '',
    date: '',
  });
  const [dateTimeBox, setDateTimeBox] = useState<DateTimeType[]>([]);
  const startRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLInputElement>(null);
  const icon = <IconCalendar style={{ width: rem(18), height: rem(18) }} stroke={1.5} />;

  const handlePickerClick = (ref: React.RefObject<HTMLInputElement>) => {
    ref.current?.showPicker();
  };

  const pickerControl = (ref: React.RefObject<HTMLInputElement>) => (
    <ActionIcon variant="subtle" color="gray" onClick={() => handlePickerClick(ref)}>
      <IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
    </ActionIcon>
  );

  const onDateSelectChange = (selectedDate: Date | null) => {
    const formatData = selectedDate ? dayjs(selectedDate).format('YYYY-MM-DD') : '';
    setDateTime(prevState => ({
      ...prevState,
      selectDate: selectedDate, // DatePicker에 보여주기 위한 값
      date: formatData, // string으로 포맷된 값 저장
    }));
  };

  const onStartTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const time = event.target.value;
    setDateTime(prevState => ({
      ...prevState,
      startTime: time,
    }));
  };

  const onEndTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const time = event.target.value;
    setDateTime(prevState => ({
      ...prevState,
      endTime: time,
    }));
  };

  const onAddSchedule = () => {
    if (dateTime.selectDate && dateTime.startTime && dateTime.endTime) {
      setDateTimeBox(prevState => [...prevState, dateTime]);
    }
  };

  const onRemoveSchedule = (index: number) => {
    setDateTimeBox(prevState => prevState.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (!dateTimeBox) return;
    const filteredDateTimeBox = dateTimeBox.map(({ selectDate, ...rest }) => ({
      ...rest,
    }));
    setValue('schedules', filteredDateTimeBox);
  }, [dateTimeBox]);

  return (
    <div className={S.container}>
      <div className={S.datePickerInputContainer}>
        <div className={S.datePickerWrapper}>
          <DatePickerInput
            id={id}
            label="날짜"
            valueFormat="YY/MM/DD"
            rightSection={icon}
            leftSectionPointerEvents="none"
            placeholder="YY/MM/DD"
            value={dateTime.selectDate}
            onChange={onDateSelectChange}
            styles={{
              input: {
                width: '100%',
                maxWidth: '380px',
                height: '56px',
                border: error ? '1px solid #ff472e' : '',
              },
              root: { borderColor: 'blue' },
            }}
          />
        </div>
        <div className={S.timeWrapper}>
          <TimeInput
            label="시작 시간"
            placeholder="0:00"
            ref={startRef}
            rightSection={pickerControl(startRef)}
            value={dateTime.startTime}
            onChange={onStartTimeChange}
            styles={{
              input: {
                width: '100%',
                maxWidth: '140px',
                height: '56px',
                border: error ? '1px solid #ff472e' : '',
              },
              root: { borderColor: 'blue' },
            }}
          />
        </div>
        <div className={S.tilde}>~</div>
        <div className={S.timeWrapper}>
          <TimeInput
            label="종료 시간"
            placeholder="0:00"
            ref={endRef}
            rightSection={pickerControl(endRef)}
            value={dateTime.endTime}
            onChange={onEndTimeChange}
            styles={{
              input: {
                width: '100%',
                maxWidth: '140px',
                height: '56px',
                border: error ? '1px solid #ff472e' : '',
              },
              root: { borderColor: 'blue' },
            }}
          />
        </div>
        <div className={S.plusButton} onClick={onAddSchedule}>
          <Image src={plusIcon} alt="일정 등록 버튼" width={56} height={56} />
        </div>
      </div>
      <div className={S.itemDateTimeContainer}>
        {dateTimeBox &&
          dateTimeBox.map((item, index) => (
            <div key={`${item}-${index}`} className={S.itemDateTime}>
              <div className={S.itemDate}>{dayjs(item.selectDate).format('YY/MM/DD')}</div>
              <div className={S.itemTime}>{item.startTime}</div>
              <div className={S.itemTilde}>~</div>
              <div className={S.itemTime}>{item.endTime}</div>
              <div className={S.minusButton} onClick={() => onRemoveSchedule(index)}>
                <Image src={minusIcon} alt="일정 삭제 버튼" width={56} height={56} />
              </div>
            </div>
          ))}
      </div>
      {error && <p className={S.message}>{message?.toString()}</p>}
    </div>
  );
}
