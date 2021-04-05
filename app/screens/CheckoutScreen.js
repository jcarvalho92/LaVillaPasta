import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import AuthContext from "../auth/context";
import { StyleSheet, View }  from "react-native";
import {CheckBox} from 'react-native-elements';
import * as Yup from "yup";
import authApi from "../api/auth";
import ordersApi from "../api/orders";
import Button from "../components/Button";
import ButtonIcon from "../components/ButtonIcon";
import Form from "../components/forms/Form";
import FormField from "../components/forms/FormField";
import PaymentView from "../components/PaymentView";
import ListItem from "../components/lists/ListItem";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import Text from "../components/Text";
import colors from "../config/colors";
import axios  from 'axios'


const validationSchema = Yup.object().shape({
  phone: Yup.string().required().max(10).label("Mobile Number"),
});

function CheckoutScreen({ route }) {
  const total = route.params;
  const authContext = useContext(AuthContext);
  const [response, setResponse] = useState();
  const [makePayment, setMakePayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [user, setUser] = useState({address:{}});
  const [isLoading, setLoading] = useState(true);
  const [deliveryTime, setDeliveryTime] = useState(60);
  const [isPaidUsingCashBack, setIsPaidUsingCashBack] = useState(false);

  const cartInfo ={
    description: "La Villa Pasta - food",
    amount: isPaidUsingCashBack ? total - user.cashBackAmount : total
  }

  const onCheckStatus = async (paymentResponse) => {
    setPaymentStatus('Please wait while confirming your payment!');
    setResponse(paymentResponse);

    let jsonResponse = JSON.parse(paymentResponse);

    try {
        const stripeResponse = await axios.post('http://10.0.2.2:8000/payment', {
            email: user.email,
            product: cartInfo,
            authToken: jsonResponse
        })

        if(stripeResponse){
            const { paid } = stripeResponse.data;

            if(paid === true){
                setPaymentStatus('Payment Done!!!')
            }else{
                setPaymentStatus('Payment failed due to some issue')
            }

        }else{
            setPaymentStatus(' Payment failed due to some issue')
        } 
    } catch (error) {
        console.log(error)
        setPaymentStatus(' Payment failed due to some issue')
    }
}

  useEffect(() => {
    loadUserInfo();
  }, []);

  const loadUserInfo = async () => {
    setLoading(true)
    const response = await authApi.getUserInfo(authContext.token);
    setUser(response.data.data);
    setLoading(false);

  }

  const postBillings = async () => {
    setDeliveryTime(Math.floor(Math.random() * (60 - 30) + 30));
    //const result = await ordersApi.postBillings(authContext.token,orderId, address)
  }

  const validateCashbackPayment = () => {
    setIsPaidUsingCashBack(!isPaidUsingCashBack);
  }
  
  const paymentUI = () => {
    if(!makePayment){
      return <View style={{ display: 'flex', flexDirection: 'column', height: 300}}>
       {isLoading ? ( 
        <Text>Loading...</Text> )
       :<View>
        <View style={styles.deliveryContainer}>
          <Text style={styles.title}>Delivery To:</Text> 
          <View style={styles.rowContainer}>
            <Form
               initialValues=
                {{ 
                  address: user.address ? (user.address.streetNumber +" "+ user.address.streetName + (user.address.apartmentNumber == null ? " ," : " ,"+user.address.apartmentNumber+", ") +user.address.city+", "+user.address.postalCode) : ""
               }}
              validationSchema={validationSchema}
            >
              <FormField
                autoCorrect={false}
                icon="home"
                name="address"
                placeholder="Enter the delivery address"
             />
            </Form>
            <View style={styles.refreshButton}>
              <ButtonIcon 
                icon="refresh"
                backgroundColor = {colors.secondary}
                onPress={() => postBillings()}
              />
            </View>
          </View>
          <Text style={styles.title}>Estimated delivery date:</Text> 
          <Text>{deliveryTime} min</Text> 
        </View>
        <ListItemSeparator></ListItemSeparator>
        <ListItem
          title="Cash Back"
          subTitle={"Current Balance $" + user.cashBackAmount}
        /> 
        <View style={styles.rowContainer}>
          <CheckBox
            checked={isPaidUsingCashBack}
            onPress={() => validateCashbackPayment()}
          />
          <Text style={styles.label}>Use my cash back</Text>
        </View>
        <ListItemSeparator></ListItemSeparator>
        <Text style={{margin: 10}}> Total: ${total} </Text>
        <Text style={{margin: 10}}> Payable Amount: ${cartInfo.amount} </Text>
        <View style={styles.buttonsContainer}>
          <Button 
            title="Proceed To Pay" 
            color="primary"
            onPress={() => {
              setMakePayment(true)
            }}>
          </Button>
        </View>
       </View>}
      </View>
    }else{
        if(response !== undefined){
            return <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 300, marginTop: 50}}>
                <Text style={{ fontSize: 25, margin: 10}}> { paymentStatus} </Text>
                
            </View>

        }else{
            return <PaymentView onCheckStatus={onCheckStatus} product={cartInfo.description} amount={cartInfo.amount} />
        }
    }
  }

  return (
    <View style={styles.container}>
      {paymentUI()}
    </View>
  );
}

const styles = StyleSheet.create({

  container: { flex: 1, 
    paddingTop: 100
  },
  buttonsContainer: {
    padding: 20,
    width: "100%",
  },
  title: {
    fontWeight: "bold",
  },
  paymentTitle: {
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center"
  },
  deliveryContainer: {
    padding: 15,
  },
  rowContainer: {
    flexDirection: "row",
    width: "90%",
  },
  refreshButton:{
    marginTop: 15,
    marginLeft: 5,
  },
  label: {
    marginTop: 15,
    marginLeft: -10,
    fontSize: 17
  },
  
});

export default CheckoutScreen;
