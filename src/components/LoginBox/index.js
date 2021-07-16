import { useState } from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import styles from '../../styles/components/LoginBox.module.css'
import api from '../../services/api'
import Swal from 'sweetalert2'

import { Loading } from '../Loading'

export default function LoginBox() {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  
  async function handleLogin(){
    setLoading(true)
    try{
      const response = await api.post("v1/login", {
        login: user,
        password: pass
      })
      const campus = response.data.user.campus_id
      const token = response.data.token
      localStorage.setItem("ALERTAUFESuserType", response.data.user.user_type)
      localStorage.setItem("ALERTAUFESuserToken", token)
      localStorage.setItem("ALERTAUFESuserCampusId", campus)
      if(response.data.user.user_type === 'admin'){
        router.push('/Campi')
      }else{
        router.push('/Map')
      }
      
    }
    catch(error){
      Swal.fire(`${error.response.data.message}`, '', 'error')
    }
    setLoading(false)
  }

  return (
    <div className={styles.container} >
      <div className={styles.loginBox} >
        <div className={styles.textBox}>
          <img src="images/avatar.svg" alt="imagem de avatar" />
          <p className={styles.greetings}>
            Bem vindo!
          </p>
          <p className={styles.logToContinue}>
            <b>Faça o login para continuar</b>
          </p>
        </div>

        <div className={styles.loginField}>
          <label className={styles.fieldText} htmlFor="user">
            <b>USUÁRIO*</b>
          </label>
          <input className={styles.input} type="text" placeholder="" name="user" onChange={(e)=>setUser(e.target.value)} required />
        </div>

        <div className={styles.loginField}>
          <label className={styles.fieldText} htmlFor="psw">
            <b>SENHA*</b>
          </label>
          <input className={styles.input} type="password" placeholder="" name="psw" onChange={(e)=>setPass(e.target.value)} required />
          <Link href="https://senha.ufes.br/site/recuperaCredenciais">
            <p className={styles.forgotPass}><u>Esqueceu sua senha?</u></p>
          </Link>
        </div>

        <div onClick={handleLogin} className={styles.loginButton}>
          <p className={styles.loginTextButton}>LOGIN</p>
        </div>
      </div>
      {
        loading && 
        <div className={styles.loading}>
          <Loading />
        </div>
      }
    </div>
  )
}
