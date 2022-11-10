import { Col, Row } from 'antd'
import React from 'react'
import Title from '../Title'
import './index.css'

const team = [
    {
        name: 'Leonardo Pacheco',
        role: 'Frontend and Smart Contract Developer',
        image: ''
    },
    {
        name: 'Anahi Jacome',
        role: 'UI/UX Designer',
        image: ''
    },
    {
        name: 'Wayner Moya',
        role: 'Cloud Architect',
        image: ''
    }
]

const AboutUsCard = ({name, role, image}) => {

    return <Col span={24} md={8} className='gutter-row'>

        <div className='about-us-card '>

            <div style={{height: '200px'}}>Imagen</div>
            <h2> {name} </h2>
            <h3>{role}</h3>
        </div>

    </Col>
}

const AboutUs = () => {
  return (
    <div>
        <Title name={'About Us'} />

        <Row gutter={150}>
            {team.map((item, key ) => (
                <AboutUsCard key={key} {...item} />
            ))}
        </Row>
    </div>
  )
}

export default AboutUs