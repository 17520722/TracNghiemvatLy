import React, { useEffect, useState } from 'react'
import { Button,
     MenuItem,
     FormControl,
     InputLabel,
     Select,
     TextField,
     CircularProgress } from '@material-ui/core'
import { createTopic, getAllTopic } from '../../graphql/topic.service';
import Toast from '../../components/Toast';
import { useDispatch } from 'react-redux';
import { set_show_toast } from '../../actions/Toast';
import * as _ from 'lodash';

const Topic = () => {
     const [isShowModal, setShowModal] = useState(false);
     const [topicClass, setTopicClass] = useState(1000);
     const [topicChapter, setTopicChapter] = useState(10);
     const [topicName, setTopicName] = useState("");
     const [isLoading, setLoading] = useState(false);
     //cần phải redux khối Toast nay
     const [typeToast, setTypeToast] = useState("");
     const [textToast, setTextToast] = useState("");
     const [listTopic, setListTopic] = useState([]);
     const [numberTopic, setNumberTopic] = useState(0);
     const dispatch = useDispatch();

     useEffect(() => {
          getAllTopic().then(response => response.text()).then(result => {
               let rawData = JSON.parse(result);

               if (rawData.data === null) {
                    setTypeToast("error");
                    setTextToast("Lỗi: không tiếp cận được máy chủ.");
                    setLoading(false);
                    dispatch(set_show_toast(true));

                    return;
               }

               const sortTopic = _.sortBy(rawData.data.topics, [o => o.topicId]);

               setListTopic(sortTopic);
               setNumberTopic(rawData.data.topics.length);
               console.log(listTopic)
          })
     },[numberTopic])

     function onChangeHandle(e) {
          setTopicClass(e.target.value);
     }
     function onHandleModal() {
          setShowModal(!isShowModal);
     }
     function onChangeChapter(e) {
          setTopicChapter(e.target.value);
     }
     function onChangeTopicName(e) {
          setTopicName(e.target.value);
     }

     async function onCreateTopic() {
          setLoading(true);
          createTopic({
               topicId: topicClass + topicChapter,
               content: topicName.trimEnd().trimStart(),
          }).then(response => response.text(),
          rejected => {
               setLoading(false);
               setTextToast("Lỗi bị từ chối từ máy chủ");
               setTypeToast("error");
               dispatch(set_show_toast(true));
               console.log(rejected);
          }).then(result => {
               let rawData = JSON.parse(result);

               if (rawData.data.createTopic === null) {
                    setTypeToast("error");
                    setTextToast("Lỗi: không tiếp cận được máy chủ.");
                    setLoading(false);
                    dispatch(set_show_toast(true));

                    return;
               }

               if (rawData.data.createTopic.code !== 201) {
                    setTypeToast("error");
                    if (rawData.data.createTopic.code === 302) {
                         setTextToast("Lỗi: đã tồn tại");
                    }
                    else {
                         setTextToast("Lỗi");
                    }
               } else {
                    setTypeToast("success");
                    setTextToast("Tạo chủ đề mới thành công");
               }
               setLoading(false);
               dispatch(set_show_toast(true));
          });
     }

     return (
          <React.Fragment>
               <h1 className="title">Danh sách chủ đề</h1>
               <Button variant="contained" className={ isShowModal ? "btn-secondary-color" : "btn-primary-color"} color="secondary" onClick={ onHandleModal }>
                              { isShowModal ? "Hủy" : "Chủ đề mới"}
               </Button>
               { isShowModal ? 
               <> 
                    <FormControl className="form-control-style">
                         <InputLabel id="class-select-label" >Chủ đề lớp</InputLabel>
                         <Select
                              labelId="class-select-label"
                              id="class-select"
                              value={topicClass}
                              onChange={onChangeHandle}
                         >
                              <MenuItem value={1000}>Lớp 10</MenuItem>
                              <MenuItem value={1100}>Lớp 11</MenuItem>
                              <MenuItem value={1200}>Lớp 12</MenuItem>
                         </Select>
                    </FormControl>
                    <FormControl>
                         <InputLabel id="chapter-select-label" >Chương</InputLabel>
                         <Select
                              labelId="chapter-select-label"
                              id="chapter-select"
                              value={topicChapter}
                              onChange={onChangeChapter}
                         >
                              <MenuItem value={10}>Chương 1</MenuItem>
                              <MenuItem value={20}>Chương 2</MenuItem>
                              <MenuItem value={30}>Chương 3</MenuItem>
                              <MenuItem value={40}>Chương 4</MenuItem>
                              <MenuItem value={50}>Chương 5</MenuItem>
                              <MenuItem value={60}>Chương 6</MenuItem>
                              <MenuItem value={70}>Chương 7</MenuItem>
                         </Select>
                    </FormControl>
                    <TextField id="topic-name" label="Tên chủ đề" className="form-control-style"
                         value={topicName} onChange={onChangeTopicName}/>
                    <Button variant="contained" className="btn-primary-color form-control-style btn-w-200"
                         color="secondary" 
                         style={{margin: "0 auto"}}
                         onClick={onCreateTopic}
                         disabled={isLoading}>
                         {isLoading ? <CircularProgress size={24}/> : "Tạo"}
                    </Button>
                    <Toast text={textToast} type={typeToast}></Toast>
               </> :
               null }
               <div className="topic-list">
                    <div className="class-group">
                         <h2>Lớp 10</h2>
                         {listTopic.map((item, index) => {
                              if (Math.floor(item.topicId/100) === 10) {
                                   return (
                                        <h6 key={index}>{item.content}</h6>
                                   )
                              }
                              return null;
                         })}
                    </div>
                    <div className="class-group">
                         <h2>Lớp 11</h2>
                         {listTopic.map((item, index) => {
                              if (Math.floor(item.topicId/100) === 11) {
                                   return (
                                        <h6 key={index}>{item.content}</h6>
                                   )
                              }
                              return null;
                         })}
                    </div>
                    <div className="class-group">
                         <h2>Lớp 12</h2>
                         {listTopic.map((item, index) => {
                              if (Math.floor(item.topicId/100) === 12) {
                                   return (
                                        <h6 key={index}>{item.content}</h6>
                                   )
                              }
                              return null;
                         })}
                    </div>
               </div>

          </React.Fragment>
     )
}

export default Topic
