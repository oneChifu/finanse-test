<template>
  <div class="pay">
    <div class="pay__sidebar" :class="{'pay__sidebar_opened': sidebarOpened}" @click="sidebarOpened = !sidebarOpened">
      <div class="pay__sidebar-buying">
        <div class="pay__sidebar-buying-info">
          <div class="h2">You are buying</div>
          <div>
            <div>{{ buying.info.product }}</div>
            <div><b>From {{ buying.info.from }} to {{ buying.info.to }}</b></div>
            <div>{{ buying.info.transport }}</div>
          </div>
        </div>

        <div class="pay__sidebar-buying-price">
          <div>{{ Number.parseFloat(buying.price.amount).toFixed(2) }} USD</div>
          <div>Amount to pay <span>without the payment system commission</span></div>
        </div>

        <div class="pay__sidebar-buying-seller">
          <div class="h2">Seller</div>

          <div>{{ buying.seller.title }}</div>
          <div>{{ buying.seller.address }}</div>

          <div class="pay__sidebar-buying-seller-rating">
            <div>Rating: <span>{{ buying.seller.rating }}</span></div>
            <div>Reviews: <span>{{ buying.seller.reviews.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }}</span></div>
          </div>
        </div>
      </div>

      <div class="pay__sidebar-provided">
        <a href="https://onpay.ru/" target="_blank">Provided by Onpay.ru</a>
      </div>
    </div>
    
    <div class="pay__content">
      <div class="pay__methods">
        <div class="pay__methods-head">
          <div class="h2">Payment method</div>

          <a href="#" class="pay__methods-head-limits">Payment limits</a>
        </div>

        <div class="pay__methods-nav pay__methods-nav_select">
          <select @change="makeMethodActive($event.target.value)">
            <option v-if="!methodActive.id">Choose Pay Method</option>
            <option 
              v-for="method in paymethods"
              :key="method.id"
              :selected="method.id == methodActive.id"
              :value="method.id"
            >{{ method.title }}</option>
          </select>
        </div>

        <div class="pay__methods-nav pay__methods-nav_tabs">
          <div 
            v-for="(type, index) in paymentTypes" 
            :key="index"
            class="pay__methods-nav-item"
            :class="{'pay__methods-nav-item_active': type == methodTypeActive}"
            @click="methodTypeActive = type, methodActive = {}"
          >{{ type }}</div>
        </div>

        <div class="pay__methods-list">
          <div 
            v-for="(method, index) in paymentMethods" 
            :key="index" 
            class="pay__methods-item"
            :class="{'pay__methods-item_active': method.id == methodActive.id}"
            @click="makeMethodActive(method.id)"
          >
            <div class="pay__methods-item-logo">
              <img :src="method.logo" @error="imgError($event, method)">
            </div>

            <div class="pay__methods-item-title">{{ method.title }}</div>
            <div class="pay__methods-item-fees">Payment Fees {{ method.fees }}%</div>
          </div>
        </div>
      </div>

      <div v-if="methodActive.id" class="pay__payment">
        <div class="h2">Payment</div>

        <ValidationObserver ref="paymentFormRef" v-slot="{ handleSubmit }" class="pay__payment-form">
          <form @submit.prevent="handleSubmit(onSubmit)">
            <div class="form__group pay__payment-form-amount">
              <label for="form__amount">Amount with commission</label>

              <div class="form__group-input">
                <input type="text" id="form__amount" disabled :value="Number.parseFloat(form.price).toFixed(2)">
                <div class="form__group-append">USD</div>
              </div>

              <div class="form__group-after">
                <div>payment system fees</div>
                <div>{{ methodActive.fees }}% (+${{ Number.parseFloat(form.fees).toFixed(2) }})</div>
              </div>
            </div>

            <div class="form__group">
              <label for="form__account">{{ methodActive.title }} account</label>

              <div class="form__group-input">
                <ValidationProvider name="Account" rules="required" v-slot="{ errors }">
                  <input id="form__account" type="text" v-model="form.account">
                  <span>{{ errors[0] }}</span>
                </ValidationProvider>
              </div>

              <div class="form__group-after"></div>
            </div>

            <div class="form__group">
              <label for="form__phone">Phone</label>

              <div class="form__group-input">
                <ValidationProvider name="Phone" rules="required" v-slot="{ errors }">
                  <input id="form__phone" type="text" v-model="form.phone" v-mask="'+380 ###-##-##'" placeholder="+380 999-99-99">
                  <span>{{ errors[0] }}</span>
                </ValidationProvider>
              </div>

              <div class="form__group-after"></div>
            </div>

            <div class="form__group">
              <label for="form__message">Message for seller</label>

              <div class="form__group-input">
                <ValidationProvider>
                  <textarea id="form__message" v-model="form.messange" placeholder="If you need additional services, please inform the seller about this"></textarea>
                </ValidationProvider>
              </div>
            </div>

            <div class="form__group form__group_captcha">
              <label for="form__phone">Enter captcha</label>

              <div class="form__group-input">
                <ValidationProvider name="Captcha" rules="required" v-slot="{ errors }">
                  <input id="form__phone" type="text" v-model="form.captcha">
                  <span>{{ errors[0] }}</span>
                </ValidationProvider>

                <div class="form__group-input-after">
                  <div class="captcha">
                    <img src="img/captcha.png">
                  </div>
                </div>
              </div>

              <div class="form__group-after"></div>
            </div>

            <div class="pay__payment-form-agree">
              By clicking "Confirm payment" I realize that the seller is responsible for the quality of the product/services and accept the <a href="#">terms of the agreement</a>
            </div>

            <div class=" pay__payment-form-submit">
              <button type="submit" class="button button_primary button_block">Confirm payment</button>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {ValidationObserver, ValidationProvider} from 'vee-validate'

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },

  data: () => ({
    sidebarOpened: false,
    
    buying: {
      info: {
        product: 'Flight in space / Jupiter Area',
        from: 'IO',
        to: 'GANIMED, J29, 2048, G5/42',
        transport: "Queen of the Sun"
      },
      seller: {
        title: 'National Aeronautics and Space Administration (NASA)',
        address: 'Headquarters 300 E. Street SW, Suite 5R30',
        rating: 5,
        reviews: 308042
      },
      price: {
        amount: 42350.00
      }
    },

    methodTypeActive: '',
    methodActive: {},

    form: {
      price: 0,
      fees: 0,
      account: '',
      phone: '',
      messange: '',
    },
  }),

  computed: {
    ...mapGetters({
      paymethods: "paymethods/data",
    }),

    paymentTypes() {
      let result = []
      
      this.paymethods.forEach(method => {
        if ( result.every(elem => elem != method.type) ) {
          result.push(method.type)
        }
      })

      this.methodTypeActive = result[0]

      return result
    },

    paymentMethods() {
      return this.paymethods.filter(method => {
        method.logo = 'img/'+ method.id +'.png'

        if ( method.type == this.methodTypeActive ) {
          return method
        }
      })
    },
  },

  methods: {
    imgError(event, method) {
      let imageExists = require('image-exists');
      let src = 'img/'+ method.id +'.png';

      imageExists(src, function(exists) {
        if (exists) {
          event.target.src = src
        } else {
          event.target.src = 'img/default.png';
        }
      })
    },

    makeMethodActive(id) {
      this.methodActive = this.paymethods.find(elem => elem.id == id)
      this.methodTypeActive = this.methodActive.type
      this.form.fees = (this.buying.price.amount / 100) * this.methodActive.fees
      this.form.price = this.form.fees + this.buying.price.amount
    },

    onSubmit () {
      alert('Payment confirmed!');
    },
  },

  beforeCreate() {
    this.$store.dispatch('paymethods/getPaymethods')
  }
}
</script>
