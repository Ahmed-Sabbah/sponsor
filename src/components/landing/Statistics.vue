<script setup>
import CountUp from 'vue-countup-v3'

</script>
<template>
    <section class="sponsor-statistics" id="statistics">
        <div class="main-title">
            <small>إحصائيات مشروعنا</small>
            <h3>الإحصائيات</h3>
        </div>
        <div class="content">
            <div class="statistics">
                <div class="item">
                    <h4 class="item-title">عدد الأطفال الذكور المكفولين</h4>
                    <div class="item-count">
                        <span>
                            <count-up :end-val="600" :duration="4"
                                :options="{ enableScrollSpy: true, scrollSpyDelay: 500 }"></count-up>
                        </span>
                    </div>
                    <div class="item-img">
                        <img src="@/assets/images/032-boy-13.svg" alt="boy">
                    </div>
                </div>
                <div class="item">
                    <h4 class="item-title">عدد الأطفال الإناث المكفولين</h4>
                    <div class="item-count">
                        <span>
                            <count-up :end-val="850" :duration="4"
                                :options="{ enableScrollSpy: true, scrollSpyDelay: 500 }"></count-up>
                        </span>
                    </div>
                    <div class="item-img">
                        <img src="@/assets/images/017-girl-8.svg" alt="boy">
                    </div>
                </div>
                <div class="item">
                    <h4 class="item-title">عدد الكفلاء المساهمين</h4>
                    <div class="item-count">
                        <span>
                            <count-up :end-val="1450" :duration="4"
                                :options="{ enableScrollSpy: true, scrollSpyDelay: 500 }"></count-up>
                        </span>
                    </div>
                    <div class="item-img">
                        <img src="@/assets/images/custom-2.svg" alt="boy">
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>