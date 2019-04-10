import React, { Component } from 'react';
import {Redirect} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

export default class DeleteRsvp extends Component{
    constructor(props) {
        super(props);
        this.state={
            rsvp_person: '',
            rsvp_going:false,
            toHomePage: false
        };

        this.onSubmit =  this.onSubmit.bind(this);
        this.targetHomePage =  this.targetHomePage.bind(this);

    }

    componentDidMount() {
        console.log("Refresh Data!");
        fetch('/rsvp/' + this.props.match.params.id)
            .then(data => data.json())
            .then(response => {
                this.setState({
                    rsvp_id: response._id,
                    rsvp_person: response.rsvp_person,
                    rsvp_going: response.rsvp_going
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onSubmit(e){
        e.preventDefault();

        return fetch('/rsvp/' + this.state.rsvp_id,{
            method: 'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type': 'application/json',
            },
            mode:"cors",

        })
            .then(res => res.text())
            .then(res => console.log(res))
            .then(()=>{
                this.targetHomePage();
            });

    }
    targetHomePage(){
        this.setState({
            toHomePage: true
        })
    }


    render() {
        if(this.state.toHomePage === true)
            return <Redirect to={'/'}/>;
        return (
            <div>
                <h1>Create RSVP</h1>
                <form onSubmit={this.onSubmit}>
                    <label>
                        Person Invited: {this.state.rsvp_person}
                    </label>
                    <label>
                        Rsvp: {this.state.rsvp_going}
                    </label>
                    <label>{this.state.rsvp_going?'Yes':'No'}</label>


                    <input type='submit' value='Delete RSVP'/>
                    <button onClick={this.targetHomePage}>Cancel</button>

                </form>

            </div>
        );
    }
}