import { Component } from "react";
import genericImage from '../../assets/generic-image.jpg';
import './SpaceComponent.css';


interface SpaceComponentProps {
    spaceId: string,
    name: string,
    location: string,
    // '?' means an optional property
    photoUrl?: string,
    reserveSpace: (spaceId: string) => void
}

// this component only has props, no states
export class SpaceComponent extends Component<SpaceComponentProps> {

    private renderImage(){
        if (this.props.photoUrl) {
            // if the photoUrl is provided, display the img
            return <img src={this.props.photoUrl} alt=''/>
        } else {
            // otherwise, display a generic img
            return <img src={genericImage} alt=''/>
        }
    }

    render(){
        return <div className='spaceComponent'>
            {this.renderImage()}
            <label className='name' >{this.props.name}</label><br/>
            <label className='spaceId'>{this.props.spaceId}</label><br/>
            <label className='location'>{this.props.location}</label><br/>
            <button onClick={()=>this.props.reserveSpace(this.props.spaceId)}>Reserve</button>
        </div>
    }

}