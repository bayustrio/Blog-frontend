import styled from 'styled-components';


export const Section = styled.div`
display:flex;
width:100%;
height:100vh;
`

export const Left = styled.div`
    flex:3.3;
`
export const Center = styled.div`
    flex:9;
    overflow:scroll;
`
export const Right = styled.div`
    flex:4
`

export const RightMob = styled.div`@media (max-width: 768px) {
    display:flex;
    flex-direction:column;
}
    `

