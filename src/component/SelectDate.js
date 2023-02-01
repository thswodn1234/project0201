import "react-calendar/dist/Calendar.css";
import React, { useState, createContext, useEffect } from "react";
import Calendar from "react-calendar";
import moment, { months } from "moment";
import { addDays } from "date-fns";
import Lead from "./Lead";
import Barchart from "./BarChart";
import MyModal from "./Modal";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import "../style/selectDate.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";

export const AppContext = createContext();

function SelectDate() {
  const [lead, setLead] = useState();
  const [startDate, setStartDate] = useState();
  useEffect(() => {
    setStartDate(lead?.[0]["order_date"]);
  }, [lead]);

  // 숫자만큼 선택한 날짜에서 더함
  // json 데이터 중 리드 타임을 어떤 변수에 저장해서 (+-표준편차)
  // 선택한 날짜 ~ 선택된 날짜 + 리드타임까지 표시 할려고 함
  // 해당 컴포넌트에서 함수호출을 통해 화면에 나타내거나 변수에 저장할 수 있지만
  // 다른 컴포넌트에 값을 전달하는 것은 잘 모르겠음

  const d1 = [];
  // let a = 100;

  let a = startDate;
  let b = lead?.[0]["avg_leadtime"];
  // let c = moment(startDate).add(b)["_d"];
  let t = b;
  console.log(a);
  console.log(b);
  // console.log(c);

  // let c = addDays(a, b);

  // for (let i = 0; i < a; i++) {
  //   d1.push(addDays(startDate, i));
  // }

  let y = parseInt(t / 365);
  let m = parseInt((t % 365) / 30);
  let d2 = parseInt((t % 365) % 30);

  return (
    <AppContext.Provider value={[lead, setLead]}>
      <Container>
        <Row>
          <Col>
            <div className="top">
              유출여부 조회하기
              <br />
              대다수의 온라인서비스 사용자들이 동일한
              계정정보(아이디,페스워드)를 사용하고 있어, 1건의 개정정보 유출로
              막대한 피해를 입을 수 있습니다.
              <br />
              따라서 동일한 패스워드를 타 사이트에서 중복하여 사용하지 말고,
              사용중인 패스워드를 주기적으로 변경하길 권장합니다.
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Lead />
          </Col>
          <Col>
            <Calendar
              onChange={startDate}
              value={moment(startDate).add(b, "days")["_d"]}
              locale="ko"
              tileClassName={({ date, view }) => {
                if (
                  d1.find(
                    (x) =>
                      moment(x).format("DD-MM-YYYY") ===
                      moment(date).format("DD-MM-YYYY")
                  )
                ) {
                  // d1 안의 날짜 하이라이트
                  return "highlight";
                }
              }}
            />
          </Col>
          <Col>
            <MyModal props={lead} />
          </Col>
        </Row>
      </Container>
      <div>
        {moment(a).format("YYYY년 MM월 DD일")}에서 {"    "}
        {moment(startDate).add(b, "days").format("YYYY년 MM월 DD일")}까지 입니다
        <div>{`${y}year ${m}month ${d2}day`}</div>
      </div>
    </AppContext.Provider>
  );
}

export default SelectDate;
