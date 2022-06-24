import React, { useEffect, useState } from "react";
import "./Result.scss";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { AppButton } from "../../UI/button/Buttons";
import { SurveyStep, setSurveyStep } from "../../store/Slice/Step/slice";
import { setUser } from "../../store/Slice/User/slice";
const Result = () => {
  const dispatch = useDispatch();
  const [result, setResult] = useState<number>(0);
  const userSubmissions = useSelector(
    (state: RootState) => state.survey.answers
  );

  const appUser = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    debugger;
    const CalculateAnswer = () => {
      let sum = 0;
      for (let index = 0; index < userSubmissions.length; index++) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        sum += userSubmissions[index].value;
      }
      setResult(sum / 0.16);
    };
    CalculateAnswer();
  }, [userSubmissions]);

  const onStart = async () => {
    await dispatch(setSurveyStep(SurveyStep.intro));
    await dispatch(setUser(""));
  };
  return (
    <div>
      <p className='resultContainer__header'>RESULT</p>
      <h3 className='resultContainer__subHeader'>Your Score.</h3>
      <p className='resultContainer__name'>{appUser}</p>
      <p className='resultContainer__score'>{result}</p>
      <p className='resultContainer__points'>Points</p>

      <div className='resultContainer__button'>
        <AppButton
          height='60px'
          width='100px'
          value='START SURVEY'
          hasIcon={""}
          onClick={onStart}
          lineHeight={""}
        />
      </div>
    </div>
  );
};

export default Result;