import React, { Component } from 'react';

import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Collapse
} from "@material-ui/core";

class App extends Component {
  state = {
    chapters: [],
    settings: [{ num: "1", open: false },
              { num: "2", open: false },
              { num: "3", open: false }, 
              { num: "4", open: false }, 
              { num: "5", open: false }, 
              { num: "6", open: false }, 
              { num: "7", open: false },
              { num: "8", open: false }, 
              { num: "9", open: false }, 
              { num: "10", open: false }, 
              { num: "11", open: false },
              { num: "12", open: false }, 
              { num: "13", open: false }, 
              { num: "14", open: false },
              { num: "15", open: false },
              { num: "16", open: false },
              { num: "17", open: false },
              { num: "18", open: false }]
  };
  handleClick = num => {
    this.setState(state => ({
      ...state,
      settings: state.settings.map(item =>
        item.num === num ? { ...item, open: !item.open } : item
      )
    }));
  };
  componentDidMount() {
    fetch('http://localhost:3000/gita.json', {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
    .then(res => res.json())
    .then((data) => {
      this.setState({ 
        chapters: data,
      })
    })
    .catch(console.log)
  }
  
  render() {
    const { settings } = this.state;
    return (
      // Your JSX code goes here.
      <div className="container">
        <div className="col-xs-12">
        <h1>Bhagawad Gita</h1>
        <div style={{ marginRight: "15px" }}>
        <List component="nav">
        {this.state.chapters.map(each => (
          <React.Fragment key={each.id}>
            <ListItem button onClick={() => this.handleClick(each.id)}>
            <div className="card">
              <div className="card-body">
                <ListItemText inset primary={each.sname} />
                
                <h5 className="card-title">{each.sname}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{each.ename}</h6>
                {settings.find(item => item.id === each.id).open
                  ? "expanded"
                  : "collapsed"}
                  </div>
            </div>
            </ListItem>
            <Divider/>
            <Collapse
              in={settings.find(item => item.id === each.id).open}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {each.verseList.map(verseList => (
                  <ListItem key={verseList.id} button>
                    <div className="card">
                        <div className="card-body">
                        <ListItemText inset primary={verseList.stext} />
                    
                          <h6 className="card-subtitle mb-2 text-muted">{verseList.stext}</h6>
                          <h6 className="card-subtitle mb-2 text-muted">{verseList.etext}</h6>
                        </div>
                      </div>
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
        ))}
        </List>
        </div>
        </div>
       </div>
    );
  }
}

export default App;
