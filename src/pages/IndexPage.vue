<template>
  <div class="q-pa-md">
    <q-table
      class="my-sticky-virtscroll-table"
      virtual-scroll
      flat
      bordered
      v-model:selected="selected"
      :rows-per-page-options="[100]"
      :virtual-scroll-sticky-size-start="48"
      row-key="index"
      title="List Request"
      selection="multiple"
      :rows="tempApproval"
      :columns="columns"
      ><template v-slot:top-right>
        <q-input
          outlined
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn
          class="q-ml-md"
          label="Search"
          color="primary"
          @click="dialogSearch = true"
        />
        <!-- <q-btn
          class="q-ml-md"
          label="Request New Sample"
          color="green-9"
          @click="dialogNew = true"
        /> -->
      </template>
      <template v-slot:body-cell-action="props">
        <!-- test -->
        <!-- cell-[name/field] -->
        <q-td :props="props.value">
          <!-- <div> -->
          <div class="column">
            <q-btn
              v-if="props.row.edit_button"
              size="sm"
              class="col q-ml-md"
              label="Edit"
              color="primary"
              @click="dialogEdit(props.row)"
            />
            <!-- <template v-if="ar_button_pmd"> -->
            <q-btn
            v-if()
              size="sm"
              class="col q-ml-md"
              label="Approve"
              color="green"
              @click="dialogConfirm(props.row, 0)"
            />
            <q-btn
              size="sm"
              class="col q-ml-md"
              label="Reject"
              color="red"
              @click="dialogNew = true"
            />
            <!-- </template> -->
          </div>
          <!-- <q-badge color="primary" label="test" /> -->
          <!-- </div> -->
        </q-td>
      </template>
      <!-- <template v-slot:body-cell-area_request="props">
        <q-td :props="props">
          <q-input
            v-model.number="props.row[props.col.name]"
            input-class="text-right"
            type="number"
            dense
            borderless
            :disable="
              props.row.status == 'Approved' ||
              props.row.status == 'On Requested'
            "
          />
        </q-td>
      </template> -->
    </q-table>
    <!-- :filter="filter" -->
    <!-- <template v-slot:top-right>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template> -->
  </div>
  <q-dialog v-model="dialogShowConfirm">
    <q-card style="width: 500px; max-width: 80vw">
      <q-card-section>
        <div class="text-h6">
          {{ dConfirm.dTitle }}
        </div>

        <p>
          {{ dConfirm.dMessage }}
        </p>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn :color="dConfirm.dColor" @click="closeDialogShowConfirm()"
          >Cancel</q-btn
        >
        <q-btn flat @click="handleConfirmLink">{{
          dConfirm.dLabelButton
        }}</q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="dialogNew">
    <q-card style="width: 700px; max-width: 80vw">
      <q-form @submit.prevent="updateForm">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Form Edit Request Sample <br /></div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-input
            class="q-mt-sm"
            outlined
            v-model="selectedRows.id"
            readonly
            label="Document Number"
          />
          <q-input
            class="q-mt-sm"
            outlined
            v-model="selectedRows.nama_pemohon"
            readonly
            label="Applicant's Name"
          />
          <q-input
            class="q-mt-sm"
            outlined
            v-model="selectedRows.zdate"
            readonly
            label="Request Date"
          />
          <q-input
            class="q-mt-sm"
            outlined
            v-model="selectedRows.jenis_produk"
            readonly
            label="Type Product(Varietas)"
          />
          <q-input
            class="q-mt-sm"
            outlined
            v-model="selectedRows.tujuan_penggunaan"
            readonly
            label="Purpose Sample Request"
          />
          <q-input
            class="q-mt-sm"
            outlined
            v-model="selectedRows.area_request"
            readonly
            label="Area Request"
          />
          <q-input
            class="q-mt-sm"
            outlined
            v-model="selectedRows.quantity"
            readonly
            label="Quantity Original"
          />
          <q-input
            class="q-mt-sm"
            outlined
            v-model="selectedRows.kemasan"
            readonly
            label="Packaging"
          />
          <br />

          <q-input
            class="q-mt-sm mt-lg"
            outlined
            v-model="selectedRows.tujuan_penggunaan_edit"
            label="Edit Purpose Sample Request"
          />
          <q-input
            class="q-mt-sm"
            outlined
            v-model="selectedRows.area_request_edit"
            label="Edit Area Request"
          />
          <q-input
            class="q-mt-sm"
            type="number"
            outlined
            v-model="selectedRows.quantity_edit"
            label="Edit Quantity Original"
          />
          <q-input
            class="q-mt-sm"
            outlined
            v-model="selectedRows.kemasan_edit"
            label="Edit Packaging"
          />
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn color="green-9" @click="closeDialogNew">Back</q-btn>
          <q-btn flat type="submit">EDIT REQUEST</q-btn>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
  <q-dialog v-model="dialogSearch">
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Search</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <q-input
          class="q-mt-sm"
          outlined
          v-model="text"
          label="Applicant's Name"
        />
        <q-input class="q-mt-sm" outlined v-model="text" label="Department" />
        <q-input class="q-mt-sm" outlined v-model="text" label="Type Product" />
        <q-input class="q-mt-sm" outlined v-model="text" label="Qty" />
        <q-input class="q-mt-sm" outlined v-model="text" label="Area Request" />
        <q-input
          class="q-mt-sm"
          outlined
          v-model="text"
          label="Purpose Request"
        />
        <q-input class="q-mt-sm" outlined v-model="text" label="Request Qty" />
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn flat @click="closeDialogSearch">Back</q-btn>
        <q-btn color="primary" @click="closeDialogSearch">Search</q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "src/boot/firebase";
import { useAuthStore } from "src/stores/auth";

const authStore = useAuthStore();
const { logout, user, userLevel, userNext } = authStore;

const columns = [
  {
    name: "action",
    align: "left",
    label: "Action",
    field: "action",
    sortable: false,
  },
  {
    name: "status",
    align: "left",
    label: "Status",
    field: "status",
    sortable: true,
  },
  {
    name: "document_number",
    align: "left",
    label: "Document Number",
    field: "actui",
    sortable: true,
  },
  {
    name: "name",
    required: true,
    label: "Applicant's Name",
    align: "left",
    field: "nama_pemohon",
    sortable: true,
  },
  {
    name: "request_date",
    required: true,
    label: "Request Date",
    align: "left",
    field: "zdate",
    sortable: true,
  },
  {
    name: "type_product",
    required: true,
    label: "Type Product(Varietas)",
    align: "left",
    field: "jenis_produk",
    sortable: true,
  },
  {
    name: "purpose_request",
    align: "left",
    label: "Purpose Sampe Request",
    field: "tujuan_penggunaan",
    sortable: true,
  },
  {
    name: "area_request",
    align: "left",
    label: "Area Request",
    field: "area_request",
    sortable: true,
  },
  {
    name: "quantity",
    required: true,
    label: "Quantity",
    align: "left",
    field: "quantity",
    sortable: true,
  },
  {
    name: "packaging",
    required: true,
    label: "Packaging",
    align: "left",
    field: "kemasan",
    sortable: true,
  },
  {
    name: "purpose_request_edit",
    align: "left",
    label: "Edit Purpose Sampe Request",
    field: "tujuan_penggunaan_edit",
    sortable: true,
  },
  {
    name: "area_request_edit",
    align: "left",
    label: "Edit Area Request",
    field: "area_request_edit",
    sortable: true,
  },
  {
    name: "quantity_edit",
    required: true,
    label: "Edit Quantity",
    align: "left",
    field: "quantity_edit",
    sortable: true,
  },
  {
    name: "packaging_edit",
    required: true,
    label: "Edit Packaging",
    align: "left",
    field: "kemasan_edit",
    sortable: true,
  },
];

// Generate rows for the table
const rows = ref([]);
// for (let i = 0; i < 100; i++) {
//   rows = rows.concat(seed.slice(0).map((r) => ({ ...r })));
// }
// rows.forEach((row, index) => {
//   row.index = index;
// });

// Fetch data from Firestore on component mount
// Function to fetch subcollection data

// Define reactive state variables
const text = ref("");
const filter = ref([]);
const dialogSearch = ref(false);
const dialogNew = ref(false);
const selected = ref([]);
const pagination = ref({
  rowsPerPage: 100,
});

// Define methods
const closeDialogSearch = () => {
  dialogSearch.value = false;
};

const closeDialogNew = () => {
  dialogNew.value = false;
};

const tempApproval = ref([]);
const fetchItems = async () => {
  userLevelZ.value = userNext[0].parvw;
  try {
    const querySnapshot = await getDocs(
      collection(db, "approvalDD" + "/" + user.seller_id + "/" + user.seller_id)
    );
    tempApproval.value = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      edit_button: doc.data().aprov_pmd === "" && userLevelZ.value === "Z4",
      // ar_button_pmd: doc.data().aprov_pmd !== "" && userLevelZ.value === "Z4",
      // ar_button_cs: doc.data().aprov_cs !== "" && userLevelZ.value === "Z5",
      // ar_button_admin:
      //   doc.data().aprov_admin !== "" && userLevelZ.value === "Z6",
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching collection: ", error);
  }
};
const userLevelZ = ref("");

const handleUpdateAllDocument = async (approve = false, reject = false) => {
  console.log("handle all document");
  // Initiate the Parameter for User Logged in and all User
  const mergeParameter = {
    tujuan_penggunaan_edit: selectedRows.value.tujuan_penggunaan_edit,
    quantity_edit: selectedRows.value.quantity_edit,
    area_request_edit: selectedRows.value.area_request_edit,
    kemasan_edit: selectedRows.value.kemasan_edit,
    aprov_pmd: "",
  };

  if (approve) {
    if (userLevelZ.value == "Z4") {
      mergeParameter.aprov_pmd = "Y";
    }
    if (userLevelZ.value == "Z5") {
      mergeParameter.aprov_cs = "Y";
    }
    if (userLevelZ.value == "Z6") {
      mergeParameter.aprov_admin = "Y";
    }
  }

  if (reject) {
    if (userLevelZ.value == "Z4") {
      mergeParameter.aprov_pmd = "N";
    }
    if (userLevelZ.value == "Z5") {
      mergeParameter.aprov_cs = "N";
    }
    if (userLevelZ.value == "Z6") {
      mergeParameter.aprov_admin = "N";
    }
  }

  // Start Change The User Who Approve
  const updateRef = doc(
    db,
    "approvalDD" +
      "/" +
      user.seller_id +
      "/" +
      user.seller_id +
      "/" +
      selectedRows.value.id
  );
  await setDoc(updateRef, mergeParameter, { merge: true });
  // End Change The User Who Approve

  // Reference All Document Based on User
  const checkNik = ref([
    { field_name: "nik_me_request", type: "Z1" },
    { field_name: "nik_am_aprov", type: "Z2" },
    { field_name: "nik_rh_aprov", type: "Z3" },
    { field_name: "nik_pmd_aprov", type: "Z4" },
    { field_name: "nik_cs_aprov", type: "Z5" },
    { field_name: "nik_admin_aprov", type: "Z6" },
  ]);

  const finalValue = checkNik.value
    .map((row) => ({
      id: selectedRows.value.id,
      directoryFolder: selectedRows.value[`${row.field_name}`],
      field_name: row.field_name,
    }))
    .filter((row) => row.directoryFolder.length > 0);

  finalValue.forEach((item) => {
    const allDoc = doc(
      db,
      "approvalDD" +
        "/" +
        item.directoryFolder +
        "/" +
        item.directoryFolder +
        "/" +
        item.id
    );
    setDoc(allDoc, mergeParameter, { merge: true });
  });
};

const updateForm = async () => {
  try {
    await handleUpdateAllDocument(false, false);

    console.log("Document successfully updated!");
  } catch (error) {
    console.error("Error updating document:", error);
    throw error;
  }
};
console.log("ok");
console.log(user.seller_id);
console.log(tempApproval);

const selectedRows = ref({});
onMounted(fetchItems);

const dialogEdit = (row) => {
  selectedRows.value = row;
  // console.log(selectedRows.value);
  dialogNew.value = true;
};

const dConfirm = ref({
  dTitle: "",
  dMessage: "",
  dDirect: "",
  dColor: "",
});

const dialogShowConfirm = ref(false);

const closeDialogShowConfirm = () => {
  dialogShowConfirm.value = false;
};

const doApproval = async () => {
  console.log("handle all document");

  await handleUpdateAllDocument(true, false);
};

// Intermediate function to handle dynamic method call
const handleConfirmLink = () => {
  if (dConfirm.value.dDirect == "doApproval") {
    doApproval();
  }
};

const dialogConfirm = (row, type) => {
  if (type == 0) {
    dConfirm.value.dTitle = "Confirm Approval?";
    dConfirm.value.dMessage = "Are you sure want to Approve this Request?";
    dConfirm.value.dDirect = "doApproval";
    dConfirm.value.dLabelButton = "Yes, Approve";
    dConfirm.value.dColor = "green-9";

    selectedRows.value = row;
    dialogShowConfirm.value = true;
  }
  if (type == 1) {
  }
};
</script>

<style lang="sass">
.my-sticky-virtscroll-table
  /* height or max-height is important */
  max-height: 80vh

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th /* bg color is important for th; just specify one */
    background-color: white

  thead tr th
    position: sticky
    z-index: 1
  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
  thead tr:first-child th
    top: 0

  /* prevent scrolling behind sticky top row on focus */
  tbody
    /* height of all previous header rows */
    scroll-margin-top: 48px
</style>
