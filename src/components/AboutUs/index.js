import { Col, Row } from 'antd'
import React from 'react'
import Title from '../Title'
import './index.css'
import LeoImage from '../../assets/image/leo.svg'
import AniImage from '../../assets/image/ani.svg'
import WaynerImage from '../../assets/image/wayner.svg'

const team = [
    {
        name: 'Leonardo Pacheco',
        role: 'Frontend and Smart Contract Developer',
        image: LeoImage
    },
    {
        name: 'Anahi Jacome',
        role: 'UI/UX Designer',
        image: AniImage
    },
    {
        name: 'Wayner Moya',
        role: 'Cloud Architect',
        image: WaynerImage
    }
]

const AboutUsCard = ({name, role, image}) => {

    return <Col span={24} md={12} lg={8} className='gutter-row'>

        <div className='about-us-card '>

            <div style={{height: '200px'}}>
                <img alt='team-member' className='team-member-img' src={image} />
            </div>
            <h2> {name} </h2>
            <h3>{role}</h3>
        </div>

    </Col>
}

const AboutUs = () => {
  return (
    <div>
        <Title name={'About Us'} />

        <Row gutter={[150, 24]}>
            {team.map((item, key ) => (
                <AboutUsCard key={key} {...item} />
            ))}
        </Row>
    </div>
  )
}

export default AboutUs