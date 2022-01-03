import { useState } from "react";
import styled from "styled-components";
import { color } from '../styles'
import Illust from '../components/Illust'
import UserProfile from '../components/UserProfile'
import Tab from '../components/Tab'
// import ChallengeCard from "../components/ChallengeCard";


const MypageContainer = styled.div`
    background-color: ${color.white};
`

const Mypage = () => {
    const [view, setView] = useState("ongoing")

    const tabContent = {
        ongoing: (
            <>진행중</>
        ),
        finished: (
            <>완료됨</>
        ),
    }
    return (
        <MypageContainer>
            <Illust />
            <UserProfile />
            <Tab tabInfo={[["ongoing", "참여중인 챌린지"], ["finished", "완료된 챌린지"]]}handleView={setView}/>
            {tabContent[view]}
        </MypageContainer>
    )
};

export default Mypage;