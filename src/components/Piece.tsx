import * as React from 'react';

export const Piece = (props: {
    rotate: number,
    active: boolean,
    r: number,
    petal: number,
    color: string,
    reward: string,
}) => {
    const getTanDeg = (deg: number) => {
        return Math.tan(deg * Math.PI / 180);
    }

    const styles = {
        triangle: {
            borderLeft: `${props.r * getTanDeg(360 / (props.petal * 2))}px solid transparent`,
            borderRight: `${props.r * getTanDeg(360 / (props.petal * 2))}px solid transparent`,
            borderBottom: `${props.active ? props.r + 60 : props.r}px solid ${props.color}`,
            borderRadius: '100%',
            transform: `rotate(${props.rotate}deg)`,
            transformOrigin: '50% 0',
        },
        reward: {
            transform: `rotate(${90}deg)`,
            fontSize: props.active ? '3rem' : '2.5rem'
        }
    }

    const [classNames, setClassNames] = React.useState('reward');

    React.useEffect(() => {
        let specAnimation: any;
        if(props.reward === '2.021.000'){
            let temp = true;
            specAnimation = setInterval(() => {
                setClassNames(temp ? 'reward_red' : 'reward');
                temp = !temp;
            }, 200);
        }
        return () => {
            specAnimation && clearInterval(specAnimation);
            setClassNames('reward');
        }
    }, [props, props.reward]);

    return (
        <>
            <div className={`w-0 h-0 absolute top-0 left-0`} style={styles.triangle}>
                <div className={`${classNames} ${props.active ? 'mt-40' : 'mt-32'}`} style={styles.reward}>
                    {props.reward}
                </div>
            </div>
        </>

    )
}
