import React, { Component } from 'react'
import Notifications, { notify } from 'react-notify-toast'
import Spinner from '../../common/Spinner';
import { SERVER_URL} from '../../config';
import axios from 'axios';

const toastColor = 
  { background: '#03cae7', text: "#0E1717" };

  const errorColor = 
  { background: '#731416', text: "#FFFFFF" }

class UploadImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploading: false,
            image: ''
        }
    }

    toast = notify.createShowQueue();

    componentDidMount () {
        this.setState({uploading: true})

        axios
        .get(`${SERVER_URL}/api/users/current`)
        .then(res => {
          this.setState( {image: res.data.userpicture,
                          uploading: false});  
        })
        .catch(err => this.onNotifyToast('failed to get user parameters', 'error'));
    }


    onImageRemove = () => {
            this.setState( {uploading: true})

            axios.delete(`${SERVER_URL}/api/profiles/image-upload`)
            .then(res => {
                this.setState( 
                    {
                        image: res.data,
                        uploading: false
                    })
            })
            .catch( err => {
                this.setState( {uploading: false})
                this.onNotifyToast('failed to delete the photo', 'error');  
            })
    }

    onNotifyToast = (message, type) => {
        if (type === 'error') {
          notify.show(message, 'custom', 4000, errorColor);
        } else {
          notify.show(message, 'custom', 2500, toastColor);
        }
      }

    onImageUpload = event => {
        const errs = [] 

        const files = Array.from(event.target.files)
    
        if (files.length > 1) {
          const msg = 'Only 1 image can be uploaded at a time'
          return this.onNotifyToast(msg, 'error');  
        }
     
        const formData = new FormData()
        const types = ['image/png', 'image/jpeg', 'image/gif']
    
        files.forEach((file, i) => {
          if (types.every(type => file.type !== type)) {
            errs.push(`'${file.type}' is not a supported format`)
          }
    
          if (file.size > 150000000) {
            errs.push(`'${file.name}' is too large, please pick a smaller file`)
          }

          formData.append(i, file)
        })
        
        if (errs.length) {
            return errs.forEach(err => this.toast(err, 'custom', 4000, errorColor));
        } 
    
        this.setState({ uploading: true })

        axios.post(`${SERVER_URL}/api/profiles/image-upload`, formData)
        .then(res => {
          this.setState({
            uploading: false, 
            image : res.data
          })
        })
        .catch(err => {
          err.json().then(e => {
            this.onNotifyToast('There was an error with the images server, please try again later', 'error');
            this.setState({ uploading: false })
          })
        })
      }

  render() {


        let imageContent;
        if ((this.state.image !== undefined) && (this.state.image.length > 2) ) {
            console.log(this.state.image.length)
            imageContent =
            <div className="col-sm-4 m-auto">
                <div>
                <i className="fas fa-times-circle deletelogo pointer"
                onClick={this.onImageRemove}>
                </i>
                </div>
            <img 
            src={this.state.image} 
            alt='' 
          />
        </div> 
        } else {
            console.log(this.state.image)
                    
            imageContent =        
            <div className="col-sm-4 mr-auto">
            <label htmlFor='Image'>
            <i className="far fa-image pointer faimagess"></i>
            </label>
            <input type='file' id='Image' onChange={this.onImageUpload} multiple />
            </div> 
            }    
        
        

    return (
        <div>
        <Notifications options={{zIndex: 200, top: '58px'}} />
        {
            this.state.uploading ?
            <Spinner />
            :
            <div>{imageContent}</div>
        }
        </div>
    )
  }
}

export default UploadImage;
