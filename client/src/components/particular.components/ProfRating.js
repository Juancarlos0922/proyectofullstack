import React, {Component} from 'react'

import Rating from '@material-ui/lab/Rating'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import ProfServices from '../../services/prof.services'

class ProfRating extends Component {

  constructor(props) {
    super(props)
    this.state={ratingValue: this.props.rating}
    this.profServices = new ProfServices()
  }


  componentDidMount() {
    this.setState({ratingValue: this.props.rating})
  }

  changeRate= (value) => {
    this.profServices.rateProfessional(this.props.prof, value)
    .then(theProf => {
      this.setState({ratingValue: theProf.data.rating}) 
  })
    .catch(err => console.log('err', err))
  }

  calcRate = () => {
    return Math.floor( this.state.ratingValue.reduce( (ac, b) => parseInt(ac) + parseInt(b) )/this.state.ratingValue.length )
  }

  render () {
    // console.log(this.props.showProfs)
    if(this.props.rating.length === 0) {
        return (
          <>
            <Box component="fieldset" mb={3} borderColor="transparent">
              <Typography component="legend">Valoración:</Typography>
              <Rating 
                name={this.props.prof}
                value={0} 
                size={'small'}
                precision={1}
                max={5}
                onChange={(event, newValue) => {
                  event.persist()
                  this.changeRate(newValue)
                  } }
                />
            </Box>
        </>
        )
    } 
    else {
    
        return (
     
          <>
            <Box component="fieldset" mb={3} borderColor="transparent">
                <Typography component="legend">Valoración:</Typography>
                <Rating 
                  name={this.props.prof}  
                  value={this.calcRate()} 
                  size={'small'}
                  precision={1}
                  max={5}
                  onChange={(event, newValue) => {
                    event.persist()              
                  this.changeRate(newValue)
                  } }
                  />
            </Box>
          </>
        )
    }
  }
}

export default ProfRating