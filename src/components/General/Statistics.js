import React from 'react'
import { Icon, Image, Statistic } from 'semantic-ui-react'

const StatisticSystem = () => (
  <Statistic.Group widths='four'>
    <Statistic>
      <Statistic.Value>22</Statistic.Value>
      <Statistic.Label>tipos de serviços</Statistic.Label>
    </Statistic>

    <Statistic>
      <Statistic.Value text>
        Mais de
        <br />
        três milhões
      </Statistic.Value>
      <Statistic.Label>mensagens enviadas</Statistic.Label>
    </Statistic>

    <Statistic>
      <Statistic.Value>
        <Icon name='building' />357
      </Statistic.Value>
      <Statistic.Label>Empresas cadastradas</Statistic.Label>
    </Statistic>

    <Statistic>
      <Statistic.Value>
        <Image src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' className='circular inline' />
        420 mil
      </Statistic.Value>
      <Statistic.Label>Membros</Statistic.Label>
    </Statistic>
  </Statistic.Group>
)

export default StatisticSystem