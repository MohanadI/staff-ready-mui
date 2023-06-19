import React, { Fragment, useEffect, useState } from 'react'
// Material UI components ..
import { Box, Stack, Typography } from '@mui/material'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
// Icons Imports ..
import PersonPinIcon from '@mui/icons-material/PersonPin';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import DescriptionIcon from '@mui/icons-material/Description';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
// Header Icons file ..
import HeaderIcons from '../HeaderIcons'
import axios from 'axios'
function RevisionBody(props) {
  
  const [user, setUser] = useState({})
    
  // When the component is mounted:
    useEffect(() => {
      console.log("component mounted")
      axios.get(`/StaffReady/v10/api/document/revision/changeLog/${props.pk}`)
      .then(response => {
        console.log(response)
        setUser(response.data)
      })
      .catch(err => {
        console.log(err)
      })
    }, [props.pk])

    const openExam = () => {
      window.open(user?.fileId, '_blank')
    }

    // 

    const downloadFile = () => {
      const link = document.createElement('a');
      link.href = `/StaffReady/v10/api/file/${user?.filePk}/${user?.fileId}`;
      link.download = user?.filePk;
      link.click();
    }
  return (
    <Fragment>
        <Box sx={{ textAlign: "center", marginBottom: "15px" }}>
            <HeaderIcons />
        </Box>
        <List sx={{ display:'flex', flexDirection: "row", flexWrap: "wrap" , width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <PersonPinIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Assigned to:" secondary={user?.person?.name} />
          </ListItem>

          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ContentPasteSearchIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Status" secondary={user?.statusId} />
          </ListItem>
          
          {!user?.isDocumentPk &&
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <DescriptionOutlinedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Document content:" secondary="N / A" />
            </ListItem>
          }
          
          {!user?.filePk &&
            <ListItem onClick={downloadFile} >
              <ListItemAvatar>
                <Avatar>
                  <AttachFileOutlinedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Attachment:" secondary="Download" />
            </ListItem>
          }

          { !user?.filePk && user?.isDocumentPk &&
            <ListItem onClick={openExam} >
            <ListItemAvatar>
              <Avatar>
                <DescriptionIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText color='blue' primary="Exam:" secondary="View document." />
          </ListItem>
          }
        </List>
    </Fragment>
  )
}

export default RevisionBody