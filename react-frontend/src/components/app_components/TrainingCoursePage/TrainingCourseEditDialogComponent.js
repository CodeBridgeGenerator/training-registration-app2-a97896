import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';


const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const TrainingCourseCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [material, setMaterial] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount trainingMaterial
                    client
                        .service("trainingMaterial")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleTrainingMaterialId } })
                        .then((res) => {
                            setMaterial(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "TrainingMaterial", type: "error", message: error.message || "Failed get trainingMaterial" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            name: _entity?.name,
description: _entity?.description,
price: _entity?.price,
duration: _entity?.duration,
material: _entity?.material?._id,
        };

        setLoading(true);
        try {
            
        await client.service("trainingCourse").patch(_entity._id, _data);
        const eagerResult = await client
            .service("trainingCourse")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "material",
                    service : "trainingMaterial",
                    select:["name"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info trainingCourse updated successfully" });
        props.onEditResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to update info");
            props.alert({ type: "error", title: "Edit info", message: "Failed to update info" });
        }
        setLoading(false);
    };

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    const materialOptions = material.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit TrainingCourse" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="trainingCourse-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="name">Course Name:</label>
                <InputText id="name" className="w-full mb-3 p-inputtext-sm" value={_entity?.name} onChange={(e) => setValByKey("name", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["name"]) && (
              <p className="m-0" key="error-name">
                {error["name"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="description">Description:</label>
                <InputTextarea id="description" rows={5} cols={30} value={_entity?.description} onChange={ (e) => setValByKey("description", e.target.value)} autoResize  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["description"]) && (
              <p className="m-0" key="error-description">
                {error["description"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="price">Price:</label>
                <InputNumber id="price" className="w-full mb-3" mode="currency" currency="MYR" locale="en-US" value={_entity?.price} onValueChange={(e) => setValByKey("price", e.value)} useGrouping={false}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["price"]) && (
              <p className="m-0" key="error-price">
                {error["price"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="duration">Duration (wks):</label>
                <InputNumber id="duration" className="w-full mb-3 p-inputtext-sm" value={_entity?.duration} onChange={(e) => setValByKey("duration", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["duration"]) && (
              <p className="m-0" key="error-duration">
                {error["duration"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="material">Material:</label>
                <Dropdown id="material" value={_entity?.material?._id} optionLabel="name" optionValue="value" options={materialOptions} onChange={(e) => setValByKey("material", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["material"]) && (
              <p className="m-0" key="error-material">
                {error["material"]}
              </p>
            )}
          </small>
            </div>
                <div className="col-12">&nbsp;</div>
                <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(TrainingCourseCreateDialogComponent);
