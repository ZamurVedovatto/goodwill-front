import React, { useState } from 'react'
import { Card, Grid, Image, Label, Button, Icon, Form, Container, Segment } from 'semantic-ui-react'
import moment from 'moment'

export default function CompanyProfile() {
  const [company, setCompany] = useState("copasa")

  return (
    <>
      <Container className="container-wrapper">
        <Button
          size={"small"}
          content="Copasa"
          onClick={() => setCompany("copasa")}
        />
        <Button
          size={"small"}
          content="CEMIG com módulo"
          onClick={() => setCompany("cemig")}
        />
        <Button
          size={"small"}
          content="PUC"
          onClick={() => setCompany("puc")}
        />
        <Button
          size={"small"}
          content="Loja"
          onClick={() => setCompany("loja")}
        />
        <Button
          size={"small"}
          content="Loja com Ecommerce"
          onClick={() => setCompany("lojae")}
        />
        <Button
          size={"small"}
          content="Bar"
          onClick={() => setCompany("bar")}
        />
        <Button
          size={"small"}
          content="Gás"
          onClick={() => setCompany("gas")}
        />
        <Button
          size={"small"}
          content="Bebidas"
          onClick={() => setCompany("bebidas")}
        />
      </Container>
      <Container className="container-wrapper">
        <Grid>
          {
            company === 'copasa' && (
              <Grid.Row>
                <Grid.Column width={16}>
                  <Card fluid>
                    <Card.Content>
                      <Card.Header>Copasa</Card.Header>
                      <Card.Meta>{moment(new Date()).fromNow()}</Card.Meta>
                      <Card.Description>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate sapiente est odit nisi veniam culpa dolor illum sequi nobis! Voluptatem.</Card.Description>
                    </Card.Content>
                    <hr />
                    <Card.Content>
                      <Button
                        content="Seguir"
                        labelPosition='right'
                        icon='checkmark'
                        onClick={() => console.log('seguir')}
                        positive
                      />
                      <Button
                        icon='star'
                        color="yellow"
                        onClick={() => console.log('favoritar')}
                      />
                      <p>Esta companhia possui chaves próprias para os seus clientes. Você possui <span style={{ fontWeight:"bold" }}>NÚMERO DE REGISTRO</span>?</p>
                      <p>[  ] Sim</p>
                      <p>[  ] Não. <a href="">Desejo contactar empresa.</a></p>
      
                      <hr />
                      <p>Receber notificações</p>
                      <p>[ ] todas</p>
                      <p>[ ] outra</p>
                      <p>[ ] otura</p>
                      <p>[ ] outar</p>
                    </Card.Content>
                    <Card.Content extra>
                      <Button
                        as="div"
                        labelPosition="right"
                        onClick={() => console.log('Comentários')}
                      >
                        <Button basic color="blue">
                          <Icon name="comments" />
                        </Button>
                        <Label basic color="blue" pointing="left">
                          {12}
                        </Label>
                      </Button>
      
                    </Card.Content>
                  </Card>
                </Grid.Column>
              </Grid.Row>
            )
          }



          {
            company === 'cemig' && (
              <Grid.Row>
                <Grid.Column width={16}>
                  <Card fluid>
                    <Card.Content>
                      <Card.Header>CEMIG</Card.Header>
                      <Card.Meta>{moment(new Date()).fromNow()}</Card.Meta>
                      <Card.Description>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate sapiente est odit nisi veniam culpa dolor illum sequi nobis! Voluptatem.</Card.Description>
                    </Card.Content>
                    <hr />
                    <Card.Content>

                    <Segment style={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}>
                      <Card.Header style={{ width: "100%", textAlign: "right", marginBottom: "1rem" }}>
                        <Button
                          content="Seguir"
                          labelPosition='right'
                          icon='checkmark'
                          onClick={() => console.log('seguir')}
                          positive
                        />
                        <Button
                          icon='star'
                          color="yellow"
                          onClick={() => console.log('favoritar')}
                        />
                      </Card.Header>
                      <p>Esta companhia possui chaves próprias para os seus clientes. Você possui <span style={{ fontWeight:"bold" }}>NÚMERO DE REGISTRO</span>?</p>
                      <p>[  ] Sim</p>
                      <p>[  ] Não. <a href="">Desejo contactar empresa.</a></p>
                    </Segment>
                    <Segment style={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}>
                      <Card.Header style={{ width: "100%", textAlign: "left", marginBottom: "1rem" }}>
                        <h3>Controle de Notificações</h3>
                      </Card.Header>
                      <p>Receber notificações</p>
                      <p>[ ] todas</p>
                      <p>[ ] outra</p>
                      <p>[ ] otura</p>
                      <p>[ ] outar</p>
                    </Segment>



                      <Segment style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                        <Card.Header style={{ width: "100%", textAlign: "left", marginBottom: "1rem" }}>
                          <h3>Atendimento ao Usuário</h3>
                        </Card.Header>

                        <Card as={Button} size={'large'} color="teal" style={{ width: "22%", margin: ".5rem" }}>
                          <Card.Content>
                            <p>Pagamento de Conta</p>
                          </Card.Content>
                        </Card>
                        <Card as={Button} size={'large'} color="teal" style={{ width: "22%", margin: ".5rem" }}>
                          <Card.Content>
                            <p>Segunda via Boleto</p>
                          </Card.Content>
                        </Card>
                        <Card as={Button} size={'large'} color="teal" style={{ width: "22%", margin: ".5rem" }}>
                          <Card.Content>
                            <p>Alterar dados cadastrais</p>
                          </Card.Content>
                        </Card>

                        <Card as={Button} size={'large'} color="teal" style={{ width: "22%", margin: ".5rem" }}>
                          <Card.Content>
                            <p>Segunda via Boleto</p>
                          </Card.Content>
                        </Card>
                        <Card as={Button} size={'large'} color="teal" style={{ width: "22%", margin: ".5rem" }}>
                          <Card.Content>
                            <p>Alterar dados cadastrais</p>
                          </Card.Content>
                        </Card>
                        <Card as={Button} size={'large'} color="teal" style={{ width: "22%", margin: ".5rem" }}>
                          <Card.Content>
                            <p>Entrar em contato</p>
                          </Card.Content>
                        </Card>
                        <Card as={Button} size={'large'} color="teal" style={{ width: "22%", margin: ".5rem" }}>
                          <Card.Content>
                            <p>Segunda via Boleto</p>
                          </Card.Content>
                        </Card>
                        <Card as={Button} size={'large'} color="teal" style={{ width: "22%", margin: ".5rem" }}>
                          <Card.Content>
                            <p>Alterar dados cadastrais</p>
                          </Card.Content>
                        </Card>
                        <Card as={Button} size={'large'} color="teal" style={{ width: "22%", margin: ".5rem" }}>
                          <Card.Content>
                            <p>Entrar em contato</p>
                          </Card.Content>
                        </Card>
                        <Card as={Button} size={'large'} color="teal" style={{ width: "22%", margin: ".5rem" }}>
                          <Card.Content>
                            <p>Segunda via Boleto</p>
                          </Card.Content>
                        </Card>
                        <Card as={Button} size={'large'} color="teal" style={{ width: "22%", margin: ".5rem" }}>
                          <Card.Content>
                            <p>Alterar dados cadastrais</p>
                          </Card.Content>
                        </Card>
                        <Card as={Button} size={'large'} color="teal" style={{ width: "22%", margin: ".5rem" }}>
                          <Card.Content>
                            <p>Entrar em contato</p>
                          </Card.Content>
                        </Card>
                      </Segment>
                    </Card.Content>
                    <Card.Content extra>
                      <Button
                        as="div"
                        labelPosition="right"
                        onClick={() => console.log('Comentários')}
                      >
                        <Button basic color="blue">
                          <Icon name="comments" />
                        </Button>
                        <Label basic color="blue" pointing="left">
                          {12}
                        </Label>
                      </Button>
      
                    </Card.Content>
                  </Card>
                </Grid.Column>
              </Grid.Row>
            )
          }




          {
            company === 'puc' && (
              <Grid.Row>
                <Grid.Column width={16}>
                  <Card fluid>
                    <Card.Content>
                      <Card.Header>PUC</Card.Header>
                      <Card.Meta>{moment(new Date()).fromNow()}</Card.Meta>
                      <Card.Description>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate sapiente est odit nisi veniam culpa dolor illum sequi nobis! Voluptatem.</Card.Description>
                    </Card.Content>
                    <hr />
                    <Card.Content>
                      <Button
                        content="Seguir"
                        labelPosition='right'
                        icon='checkmark'
                        onClick={() => console.log('seguir')}
                        positive
                      />
                      <Button
                        icon='star'
                        color="yellow"
                        onClick={() => console.log('favoritar')}
                      />
                      <p>Esta companhia possui chaves próprias para os seus clientes. Você possui <span style={{ fontWeight:"bold" }}>NÚMERO DE MATRÍCULA</span>?</p>
                      <p>[  ] Sim</p>
                      <p></p>
                      <p>[  ] <a href="">Desejo contactar empresa.</a></p>
                      <p>[  ] <a href="">Desejo criar chave aleatória.</a></p>
                      <p>[  ] <a href="">Desejo utilizar uma das minhas chaves.</a></p>
                      <hr />
                      <p>Receber notificações</p>
                      <p>[ ] todas</p>
                      <p>[ ] atualização de notas</p>
                      <p>[ ] atualizações</p>
                      <p>[ ] material didático</p>
                      <p>[ ] processo de matrícula</p>
                      <p>[ ] faturas e pagamentos</p>
                      <p>[ ] solicitações</p>

                    </Card.Content>
                    <Card.Content extra>
                      <Button
                        as="div"
                        labelPosition="right"
                        onClick={() => console.log('Comentários')}
                      >
                        <Button basic color="blue">
                          <Icon name="comments" />
                        </Button>
                        <Label basic color="blue" pointing="left">
                          {12}
                        </Label>
                      </Button>
      
                    </Card.Content>
                  </Card>
                </Grid.Column>
              </Grid.Row>
            )
          }







          {
            company === 'loja' && (
              <Grid.Row>
                <Grid.Column width={16}>
                  <Card fluid>
                    <Card.Content>
                      <Card.Header>LOJA</Card.Header>
                      <Card.Meta>{moment(new Date()).fromNow()}</Card.Meta>
                      <Card.Description>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate sapiente est odit nisi veniam culpa dolor illum sequi nobis! Voluptatem.</Card.Description>
                    </Card.Content>
                    <hr />
                    <Card.Content>
                      <Button
                        content="Seguir"
                        labelPosition='right'
                        icon='checkmark'
                        onClick={() => console.log('seguir')}
                        positive
                      />
                      <Button
                        icon='star'
                        color="yellow"
                        onClick={() => console.log('favoritar')}
                      />
                      <p>[  ] <a href="">Desejo criar chave aleatória.</a></p>
                      <p>[  ] <a href="">Desejo utilizar uma das minhas chaves.</a></p>
                      <hr />
                      <p>Receber notificações</p>
                      <p>[ ] todas</p>
                      <p>[ ] promoções</p>
                      <p>[ ] meus pedidos</p>


                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Card as={Button} style={{ margin: ".5rem" }}>
                          <Card.Content>
                            <h2>10% de desconto para compras acima de R$200,00</h2>
                          </Card.Content>
                        </Card>
                        <Card as={Button} style={{ margin: ".5rem" }}>
                          <Card.Content>
                            <h2>Frete Grátis. Somente hoje! Clique aqui e Aproveite</h2>
                          </Card.Content>
                        </Card>
                      </div>

                    </Card.Content>
                    <Card.Content extra>
                      <Button
                        as="div"
                        labelPosition="right"
                        onClick={() => console.log('Comentários')}
                      >
                        <Button basic color="blue">
                          <Icon name="comments" />
                        </Button>
                        <Label basic color="blue" pointing="left">
                          {12}
                        </Label>
                      </Button>
      
                    </Card.Content>
                  </Card>
                </Grid.Column>
              </Grid.Row>
            )
          }






          {
            company === 'lojae' && (
              <Grid.Row>
                <Grid.Column width={16}>
                  <Card fluid>
                    <Card.Content>
                      <Card.Header>ECOMMERCE</Card.Header>
                      <Card.Meta>{moment(new Date()).fromNow()}</Card.Meta>
                      <Card.Description>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate sapiente est odit nisi veniam culpa dolor illum sequi nobis! Voluptatem.</Card.Description>
                    </Card.Content>
                    <hr />
                    <Card.Content>
                      <Button
                        content="Seguir"
                        labelPosition='right'
                        icon='checkmark'
                        onClick={() => console.log('seguir')}
                        positive
                      />
                      <Button
                        icon='star'
                        color="yellow"
                        onClick={() => console.log('favoritar')}
                      />
                      <hr />
                      <p>Modelar processo de venda, com carrinho, checkout e pagamento</p>


                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Card as={Button} style={{ margin: ".5rem" }}>
                          <Card.Content>
                            <h2>Camisetas Masculinas</h2>
                          </Card.Content>
                        </Card>
                        <Card as={Button} style={{ margin: ".5rem" }}>
                          <Card.Content>
                          <h2>Camisetas Femininas</h2>
                          </Card.Content>
                        </Card>
                      </div>

                    </Card.Content>
                    <Card.Content extra>
                      <Button
                        as="div"
                        labelPosition="right"
                        onClick={() => console.log('Comentários')}
                      >
                        <Button basic color="blue">
                          <Icon name="comments" />
                        </Button>
                        <Label basic color="blue" pointing="left">
                          {12}
                        </Label>
                      </Button>
      
                    </Card.Content>
                  </Card>
                </Grid.Column>
              </Grid.Row>
            )
          }










          {
            company === 'bar' && (
              <Grid.Row>
                <Grid.Column width={16}>
                  <Card fluid>
                    <Card.Content>
                      <Card.Header>ESPETO DO SEU ZÉ</Card.Header>
                      <Button
                        content="Seguir"
                        labelPosition='right'
                        icon='checkmark'
                        onClick={() => console.log('seguir')}
                        positive
                      />
                      <Button
                        icon='star'
                        color="yellow"
                        onClick={() => console.log('favoritar')}
                      />
                      <Card.Description>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate sapiente est odit nisi veniam culpa dolor illum sequi nobis! Voluptatem.</Card.Description>
                    </Card.Content>
                    <hr />
                    <Card.Content>

                      <p>[  ] <a href="">Desejo criar chave aleatória.</a></p>
                      <p>[  ] <a href="">Desejo utilizar uma das minhas chaves.</a></p>
                      <hr />
                      <p>Receber notificações</p>
                      <p>[ ] todas</p>
                      <p>[ ] promoções</p>
                      <p>[ ] meus pedidos</p>


                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Card as={Button} style={{ margin: ".5rem" }}>
                          <Card.Content>
                            <h2>10 LONG NECKS por R$59,90</h2>
                          </Card.Content>
                        </Card>
                        <Card as={Button} style={{ margin: ".5rem" }}>
                          <Card.Content>
                            <h2>5 LONG NECKS por R$36,00</h2>
                          </Card.Content>
                        </Card>
                        <Card as={Button} style={{ margin: ".5rem" }}>
                          <Card.Content>
                            <h2>01 LONG NECK por R$7,00</h2>
                          </Card.Content>
                        </Card>
                        <Card as={Button} style={{ margin: ".5rem" }}>
                          <Card.Content>
                            <h2>PORÇÃO DE FILÉ COM FRITAS por R$75,00</h2>
                            <span>Serve 04 pessoas</span>
                          </Card.Content>
                        </Card>
                      </div>

                    </Card.Content>
                    <Card.Content extra>
                      <Button
                        as="div"
                        labelPosition="right"
                        onClick={() => console.log('Comentários')}
                      >
                        <Button basic color="blue">
                          <Icon name="comments" />
                        </Button>
                        <Label basic color="blue" pointing="left">
                          {12}
                        </Label>
                      </Button>
      
                    </Card.Content>
                  </Card>
                </Grid.Column>
              </Grid.Row>
            )
          }









          {
            company === 'gas' && (
              <Grid.Row>
                <Grid.Column width={16}>
                  <Card fluid>
                    <Card.Content>
                      <Card.Header>PEDIR GÁS</Card.Header>
                      <Card.Meta>{moment(new Date()).fromNow()}</Card.Meta>
                      <Card.Description>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate sapiente est odit nisi veniam culpa dolor illum sequi nobis! Voluptatem.</Card.Description>
                    </Card.Content>
                    <hr />


                    <Card.Content>
                      <div style={{ display: "flex" }}>
                        <Button content="Melhor preço" />
                        <Button content="Menor distância" />
                        <Button content="Melhor avaliado" />
                      </div>
                    </Card.Content>
                    <Card.Content>
                      <h3>Distribuidora Liquigás</h3>
                      <p>R$79,00</p>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, cupiditate.</p>
                    </Card.Content>
                    <Card.Content>
                      <Button content="Pedir Agora" positive />
                      <Button content="Agendar Entrega" color="teal" />
                    </Card.Content>
                  </Card>
                </Grid.Column>
                
              </Grid.Row>
            )
          }


          {
            company === 'bebidas' && (
              <Grid.Row>
                <Grid.Column width={16}>
                  <Card fluid>
                    <Card.Content>
                      <Card.Header>BEBIDAS</Card.Header>
                      <Card.Meta>{moment(new Date()).fromNow()}</Card.Meta>
                      <Card.Description>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate sapiente est odit nisi veniam culpa dolor illum sequi nobis! Voluptatem.</Card.Description>
                    </Card.Content>
                    <hr />

                    <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                        <Card as={Button} style={{ margin: ".5rem" }}>
                          <Card.Content>
                            <h2>10 LONG NECKS por R$59,90</h2>
                          </Card.Content>
                        </Card>
                        <Card as={Button} style={{ margin: ".5rem" }}>
                          <Card.Content>
                            <h2>5 LONG NECKS por R$36,00</h2>
                          </Card.Content>
                        </Card>
                        <Card as={Button} style={{ margin: ".5rem" }}>
                          <Card.Content>
                            <h2>01 LONG NECK por R$7,00</h2>
                          </Card.Content>
                        </Card>
                        <Card as={Button} style={{ margin: ".5rem" }}>
                          <Card.Content>
                            <h2>REFRIGERANTE DOCINHO</h2>
                          </Card.Content>
                        </Card>
                        <Card as={Button} style={{ margin: ".5rem" }}>
                          <Card.Content>
                            <h2>10 LONG NECKS por R$59,90</h2>
                          </Card.Content>
                        </Card>
                        <Card as={Button} style={{ margin: ".5rem" }}>
                          <Card.Content>
                            <h2>5 LONG NECKS por R$36,00</h2>
                          </Card.Content>
                        </Card>
                        <Card as={Button} style={{ margin: ".5rem" }}>
                          <Card.Content>
                            <h2>01 LONG NECK por R$7,00</h2>
                          </Card.Content>
                        </Card>
                        <Card as={Button} style={{ margin: ".5rem" }}>
                          <Card.Content>
                            <h2>REFRIGERANTE DOCINHO</h2>
                          </Card.Content>
                        </Card>
                      </div>

                    <Card.Content>
                      <div style={{ display: "flex" }}>
                        <Button content="Melhor preço" />
                        <Button content="Menor distância" />
                        <Button content="Melhor avaliado" />
                      </div>
                    </Card.Content>
                    <Card.Content>
                      <h3>Distribuidora Dona Gela</h3>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, cupiditate.</p>
                    </Card.Content>
                    <Card.Content>
                      <Button content="Pedir Agora" positive />
                      <Button content="Agendar Entrega" color="teal" />
                    </Card.Content>
                  </Card>
                </Grid.Column>
                
              </Grid.Row>
            )
          }

        </Grid>
      </Container>
    </>
  )
}
