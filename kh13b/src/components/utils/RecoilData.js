
//Recoil를 이용해서 전체 애플리케이션에서 사용할 데이터를 선언
//- 기존의 SpringBoot에서 사용하는 HttpSession을 대체할 예정

import {atom, selector} from "recoil";

//atom은 recoil 저장소에 변수를 생성하는 역할
const countState = atom({
    key: 'countState', //식별자(ID)- 저장소이름
    default: 0 //초기값
});

//로그인과 관련된 저장소 설정
const loginIdState = atom({
    key: 'loginIdState',
    default: ''
});
const loginGradeState = atom({
    key: 'loginGradeState',
    default: ''
});

//atom으로 생성한 데이터를 조합하여 무언가를 계산할 수 있음(selector)
//-> 외부에서는 useRecoilValue로 부름(읽기만 가능)
const isLoginState = selector({
    key: 'isLoginState', //식별자
    get: (state)=>{ //state를 불러와서 새로운 값을 계산해서 반환하는 함수(get)

        //미리 만든 state 중에 loginIdState에 해당하는 값을 달라
        const loginId = state.get(loginIdState);
        //미리 만든 state 중에 loginGradeState에 해당하는 값을 달라
        const loginGrade = state.get(loginGradeState);

        return loginId && loginId.length > 0 && loginGrade && loginGrade.length > 0;
    }
});
//카카오페이
const partnerOrderId = atom({
    key : 'partnerOrderId',
    default : ''
  }); 

  const partnerUserId = atom({
    key : 'partnerUserId',
    default : ''
  });

  const tid = atom({
    key : 'tid',
    default : ''
  });

  const vo = atom({
    key: 'vo',
    default: []
  });

  const pgToken = atom({
    key : 'pgToken',
    default : ''
  });
  
export {countState, loginIdState, loginGradeState, isLoginState,
    partnerOrderId, partnerUserId, tid, vo, pgToken
};