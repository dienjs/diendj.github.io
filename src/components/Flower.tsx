/* eslint-disable react-hooks/exhaustive-deps */
import {Piece} from "./Piece";
import * as React from 'react';
import './flower.css'

export const Flower = (props: {
    petal: number,
    r: number,
}) => {
    const {petal, r} = props;
    const styles = {
        center: {
            margin: 0,
            top: '50%',
            left: '42%',
            transform: 'translateY(-50%)',
        }
    }

    const REWARDS = [
        '50.000', '100.000', '200.000', '100.000', '50.000', '100.000', '500.000', '2.021.000', '100.000', '200.000'
    ]

    const randomRewardsIndex = (): string[] => {
        return [
            '50.000',
            '50.000',
            '50.000',
            '50.000',
            '100.000',
            '100.000',
            '100.000',
            '100.000',
            '100.000',
            '100.000',
            '100.000',
            '100.000',
            '100.000',
            '100.000',
            '200.000',
            '200.000',
            '200.000',
            '200.000',
            '200.000',
            '500.000',
            '500.000',
            '500.000',
        ].sort(() => Math.random() - 0.5);
    }

    const [listColors, setListColor] = React.useState(['SeaShell', 'Teal', 'Plum', 'Pink', 'Orange', 'Tomato', 'SeaGreen', 'Indigo', 'Grey', 'LightBlue']);
    const [listRewards, setListRewards] = React.useState(REWARDS);
    const [finalRewardIndex, setFinalRewardIndex] = React.useState(-1);
    const [isLock, setLock] = React.useState(false);
    const [rewardString, setRewardString] = React.useState('0');
    const [playCount, setPlayCount] = React.useState(0);

    const [specialIndex, setSpecialIndex] = React.useState(Math.floor(Math.random() * 6));

    const [initRewards, setInitRewards] = React.useState(randomRewardsIndex());
    const [startIndex, setStartIndex] = React.useState(Math.floor(Math.random() * 22));

    const getPieceColor = (index: number): string => {
        return listColors[index];
    }

    const getReward = (index: number): string => {
        return listRewards[index];
    }

    const [currentPieceActive, setCurrentPieceActive] = React.useState<number>(-1);
    const [isTurning, setTurning] = React.useState(false);
    const [turningLevel, setTurningLevel] = React.useState(0);
    const [isInitial, setInitial] = React.useState(true);
    const [usersPlayed, setUsersPlayed] = React.useState<string[]>([]);
    const [done, setDone] = React.useState(false);

    React.useEffect(() => {
        if (done) {
            alert(`Chúc mừng ${user} đã quay trúng phần thưởng ${listRewards[finalRewardIndex]} VNĐ`);
            setDone(false);
        }
    }, [done])

    React.useEffect(() => {
        if (turningLevel === 0) {
            return;
        }
        let turnTime = turningLevel * 100;
        const totalTurningTime = 2600;

        let isFinished = false;
        let currentActive = currentPieceActive;
        const playInterval = setInterval(() => {
            if (currentActive === (petal - 1)) {
                currentActive = 0;
                setCurrentPieceActive(0)
            } else {
                setCurrentPieceActive(++currentActive)
            }
            if (isFinished && currentActive === finalRewardIndex) {
                clearInterval(playInterval);
                setLock(false);
                if (user !== group5[specialIndex] && user !== '...') {
                    setPlayCount(playCount + 1);
                }
                setRewardString(listRewards[finalRewardIndex]);
                setTurningLevel(0);
                setDone(true);
            }
        }, turnTime);
        setTimeout(() => {
            if (turningLevel < 5) {
                clearInterval(playInterval);
                setTurningLevel(turningLevel + 1);
            } else if (turningLevel === 5) {
                isFinished = true;
            }
        }, totalTurningTime);
    }, [turningLevel]);

    const play = () => {
        if (isLock) {
            return;
        }
        if (user !== '...' && usersPlayed.includes(user)) {
            alert('Hết lượt!');
            return;
        }
        setUsersPlayed([...usersPlayed, user]);
        setRewardString('0');
        setInitial(false);
        setLock(true);
        let listColorsClone = [...listColors];
        listColorsClone = listColorsClone.sort(() => Math.random() - 0.5);
        setListColor(listColorsClone);

        let listRewardsClone = [...listRewards];
        listRewardsClone = listRewardsClone.sort(() => Math.random() - 0.5);
        setListRewards(listRewardsClone);

        setCurrentPieceActive(-1);
        setTurning(true);
        calculateFinalReward(listRewardsClone);
        setTimeout(() => {
            setTurning(false);
            let currentActive = Math.floor(Math.random() * petal);
            setCurrentPieceActive(currentActive);
            setTurningLevel(1);
        }, 6100);
    }

    const calculateFinalReward = (currentListRewards: string[]) => {
        let rewardIndex = currentListRewards.findIndex((r) => r === initRewards[(startIndex + playCount) % 22]);
        if (user === group5[specialIndex]) {
            rewardIndex = currentListRewards.findIndex((r) => r === '2.021.000');
        } else if (user === '...') {
            rewardIndex = Math.floor(Math.random() * 10);
        }
        if (user !== '...') {
            console.log(user, currentListRewards[rewardIndex]);
        }
        setFinalRewardIndex(rewardIndex);
    }

    const reset = () => {
        if (!isLock) {
            setCurrentPieceActive(-1);
            setRewardString('0');
            setPlayCount(0);
            setUser('...');
            setStartIndex(Math.floor(Math.random() * 22));
            setInitRewards(randomRewardsIndex());
            setUsersPlayed([]);
            setSpecialIndex(Math.floor(Math.random() * 6));
        }
    }

    const [user, setUser] = React.useState('...');

    const group1 = ['A.Hoàng', 'C.Hiền', 'Ch.Linh', 'Ch.Dương'];
    const group2 = ['C.Hoan', 'A.Khoát', 'Ch.Hoa', 'Ch.Huệ', 'Ch.Mai'];
    const group3 = ['A.Hoàn', 'C.Lịch', 'Ch.Nam', 'Ch.Hà'];
    const group4 = ['A.Hiển', 'C.Linh', 'Ch.Tuấn', 'Ch.Quỳnh'];
    const group5 = ['C.Hạnh', 'A.Vũ', 'Ch.Ngọc', 'Ch.Diệp', 'Ch.Duyên', 'Ch.My'];

    const divider = '_________';

    const users = [
        '...',
        ...group1,
        divider,
        ...group2,
        divider,
        ...group3,
        divider,
        ...group4,
        divider,
        ...group5
    ]

    return (
        <>
            <div className={'relative p-10 h-screen cursor-pointer overflow-x-hidden overflow-y-hidden'} onClick={play}>
                {
                    !isLock && <div className="pyro">
                        <div className="before"/>
                        <div className="after"/>
                    </div>
                }
                <div className={`${isInitial ? 'lucky-wheel-init' : ''} absolute ${isTurning ? 'lucky-wheel' : ''}`}
                     style={styles.center}>
                    {
                        [...Array(petal)].map((value, index) => {
                            return <Piece active={currentPieceActive === index}
                                          petal={petal}
                                          color={getPieceColor(index)}
                                          key={index}
                                          reward={getReward(index)}
                                          rotate={index * 360 / petal}
                                          r={r}/>
                        })
                    }
                </div>
            </div>
            <div className={'absolute left-0 bottom-3 w-full'}>
                <div className={'grid grid-cols-3 center'}>
                    <div className={'m-auto'}>
                        <select className={'h-8 w-48'} value={user} onChange={(event) => setUser(event.target.value)}>
                            {
                                users.map((u, index) => <option key={index} disabled={u === divider}>{u}</option>)
                            }
                        </select>
                    </div>
                    <p className={'label text-center'}>Giải thưởng: {rewardString} VNĐ</p>
                    <div className={'pr-3 m-auto'}>
                        <input type={'button'} className={'btn cursor-pointer'} onClick={reset} value={'RESET'}/>
                    </div>
                </div>
            </div>
        </>
    );
}
